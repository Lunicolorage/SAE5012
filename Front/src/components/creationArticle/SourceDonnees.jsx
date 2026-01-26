import { Variables } from "./Variables"
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../context/UserProvider";

function SourceDonnees({article, setArticle, index}){
    const [user] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [jeuDonnees, setJeuDonnees] = useState([]);
    const [variables, setVariables] = useState([]);
    const [selectedVariables, setSelectedVariables] = useState([]);
    const [nomG, setNomG] = useState("");


    // récupérer jeu données en BDD pour remplir les options
    useEffect(() => {
        const fetchSourcesDonnees = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await fetch('http://localhost:8000/api/jeu_donnees', {
                    method: 'GET',
                    headers: { 
                        Authorization: `Bearer ${user.token}`
                    },
                });
            
                const response2 = await response.json();

                if (!response.ok) {
                    setError(`Erreur: ${response2.message}`);
                    return;
                }
                
                setJeuDonnees(response2.member || []);
            }
            catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchSourcesDonnees();
    }, [user.token]);

    
    // gère sélection variables
    function handleCheckVariables(variable, checked){
        setSelectedVariables((prev) => {
            if(checked) {
                // si cochée -> copie déjà là + ajoute celle qu'on vient de cocher
                const existing = prev.find(v => v.id === variable.id);
                return existing ? prev : [...prev, {...variable, backgroundColor: "#000000", baseColor: "#000000"}]
            } else {
                // sinon -> garde tout sauf celle qu'on décoche
                return prev.filter(v => v.id !== variable.id);
            }
        })

        setArticle(prev => {
            const sections = [...prev.sections]; 
            const prevDatasets = sections[index].contenu.datasets || [];

            const newDatasets = checked
                ? [...prevDatasets, { 
                        variableId: Number(variable.id), 
                        label: variable.nom, 
                        data: variable.valeurs, 
                        backgroundColor: "#000000", // met en noir par défaut
                        baseColor: "#000000",
                        borderColor: "#000000",
                    }]
                : prevDatasets.filter(ds => ds.variableId !== variable.id);

            let labels = sections[index].contenu.labels;

            if (prevDatasets.length == 0 && checked){
                labels = variable.type == "categorielle" 
                            ? variable.valeurs 
                            : variable.valeurs.map((_, i) => `valeur ${i + 1}`);// -> gérer qd nb
            }

            sections[index] = {
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    datasets: newDatasets,
                    labels,
                }
            }

            return {...prev, sections}
        })

    }


    // gestion couleurs pour pie charts
    function generatePieColors(values, mainColor) {
        if (!Array.isArray(values) || values.length == 0) return [];

        const maxValue = Math.max(...values);
        const colors = [];
        const hueStep = 360 / values.length; // Calculer l'espacement des teintes pour avoir des couleurs bien distinctes (cercle HSL (360°))
        let mainColorUsed = false;

         values.forEach((value, index) => {
            if (value == maxValue && !mainColorUsed) {
                mainColorUsed = true; // évite doublons si plusieurs max
                colors.push(mainColor);
            } else {
                // Générer une couleur HSL avec une teinte espacée
                const hue = (index * hueStep) % 360;
                colors.push(`hsl(${hue}, 70%, 60%)`); // Saturation : 70% (couleurs vives), Luminosité : 60% (pas trop sombre)
            }
        });
    
        return colors;
    }


    // adapter la gestion des couleurs en fonction du chart
    function adaptDatasetToType(dataset, type) {
        let color = generatePieColors(dataset.data, dataset.baseColor)
        if (type === "pie chart") {
            return {
                ...dataset,
                backgroundColor: color,
                borderColor: color,
            };
        }

        return {
            ...dataset,
            backgroundColor: dataset.baseColor,
            borderColor: dataset.baseColor,
        };
    }

    

    // gère couleurs variables
    // function handleColorChoice(variableId, color){
    //     // console.log(color); // récupère bien couleur (hexa)
    //     setArticle(prev => {
    //         const sections = [...prev.sections];

    //         sections[index].contenu.datasets =
    //             sections[index].contenu.datasets.map(nd => 
    //                 nd.variableId == variableId ? {...nd, backgroundColor: color, borderColor: color} : nd
    //             )                
    //         return {...prev, sections}
    //     })
    // }

    function handleColorChoice(variableId, color){
        // console.log(color); // récupère bien couleur (hexa)
        setArticle(prev => {
            const sections = [...prev.sections];

            sections[index].contenu.datasets =
                sections[index].contenu.datasets.map(nd => {
                    if (nd.variableId != variableId) return nd;

                    const updated = {...nd, baseColor: color}
                    return adaptDatasetToType(updated, sections[index].contenu.type);
                })                
            return {...prev, sections}
        })
    }
    

    // gère choix type graphique
    // function handleChoixTypeGraphique(e){
    //     const typeGraphic = e.target.value;
    //     if (!typeGraphic) return; 
        
    //     setArticle(prev => {
    //         const sections = [...prev.sections];

    //         sections[index] = {
    //             ...sections[index],
    //             contenu: {
    //                 ...sections[index].contenu,
    //                 type: typeGraphic,
    //                 // datasets: [], // réinitialiser datasets --> à voir
    //                 // labels: []    // réinitialiser labels
    //             }
    //         }
    //         return {...prev, sections}
    //     })
    //     setSelectedVariables([]);
    // }

    function handleChoixTypeGraphique(e){
        const typeGraphic = e.target.value;
        if (!typeGraphic) return; 
        
        setArticle(prev => {
            const sections = [...prev.sections];

            const adaptedDatasets = sections[index].contenu.datasets.map(ds => adaptDatasetToType(ds, typeGraphic))

            sections[index] = {
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    type: typeGraphic,
                    datasets: adaptedDatasets,
                    // datasets: [], // réinitialiser datasets --> à voir
                    // labels: []    // réinitialiser labels
                }
            }
            return {...prev, sections}
        })
        // setSelectedVariables([]);
    }



    // gère choix nom graphique
    function handleChangeNom(e){
        const nomGraphic = e.target.value;
        if (nomGraphic==""){
            return;
        }
        setNomG(nomGraphic);

        setArticle(prev => {
            const sections = [...prev.sections];

            sections[index] = {
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    title: nomGraphic,
                }
            }
            return {...prev, sections}
        })
    }

    // récupère les variables du jeu de données sélectionné
    async function handleSourceDonnees(e){
        const donneesId = e.target.value;
        if (!donneesId) return;
        console.log("donnees : ", donneesId);
        const dataset = jeuDonnees.find(jd => jd.id == donneesId);
        setSelectedData(dataset);
        console.log(dataset);

        setVariables([]);
        setSelectedVariables([]);
        setNomG("");

        setLoading(true);
        setError('');

        setArticle(prev => {
            const sections = [...prev.sections];

            sections[index]={
                ...sections[index],
                contenu: {
                    // ...sections[index].contenu,
                    type: '',
                    title: '',
                    labels: [],
                    datasets: [],
                    idDonnees: `/api/jeu_donnees/${donneesId}`,
                }
            }
            return {...prev, sections}
        })
        
        // ok
        try{ 
            const response = await fetch(`http://localhost:8000/api/jeu_donnee/${donneesId}/variables`, {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${user.token}`
                },
            });

            const nomsVar = await response.json();
            console.log("nomsVar :", nomsVar)

            if (!response.ok){
                throw new Error(nomsVar.message || "Erreur get variables");
            }

            setVariables(nomsVar);
        } catch (err) {
            setError(err.message);
        } finally{
            setLoading(false);
        }
    }

    // fonction pour enregistrer graphique directement en BDD -> abandonné
    // async function handleValidateGraphic(){
    //     // pour mettre tout bien dans toutes les tables BDD
    //     if (!selectedData) {
    //         setError("Aucun jeu de données sélectionné");
    //         return;
    //     }
        
    //     setError('');
    //     setLoading(true);

    //     try{
    //         const response = await fetch('http://localhost:8000/api/graphiques', {
    //             method: 'POST',
    //             headers: { 
    //                 Authorization: `Bearer ${user.token}`,
    //                 "Content-Type": "application/ld+json"
    //             },
    //             body: JSON.stringify({
    //                 idDonnees: `/api/jeu_donnees/${selectedData.id}`,
    //                 type: article.sections[index].contenu.type,
    //                 title: article.sections[index].contenu.title,
    //                 labels: article.sections[index].contenu.labels,
    //                 datasets: article.sections[index].contenu.datasets,
    //             })
    //         });

    //         const uploadedGraph = await response.json();

    //         if(!response.ok){
    //             throw new Error(uploadedGraph.message || "Erreur envoi données");
    //         }

    //         for (let v of selectedVariables){
    //             await fetch('http://localhost:8000/api/graphique_variables', {
    //                 method: 'POST',
    //                 headers: { 
    //                     Authorization: `Bearer ${user.token}`,
    //                     "Content-Type": "application/ld+json"
    //                 },
    //                 body: JSON.stringify({
    //                     idGraphique: `/api/graphiques/${uploadedGraph.id}`, // à voir
    //                     idVariable: `/api/variables/${v.id}`,
    //                     couleur: v.backgroundColor 
    //                 })
    //             })
    //         }


    //     } catch (err) {
    //         setError(err.message);
    //         console.error("Erreur validation graphique:", err);
    //     } finally {
    //         setLoading(false);
    //     }
    // }


    function handleCrossClick(){
        const indexToRemove = index;
        const sections = article.sections.filter((section, i)=> i!= indexToRemove)
        setArticle({...article, sections: sections})
    }
    

    return(
        <div className="zoneSourceDonnees">

            <label htmlFor="choixSourceDonnees">
                <h2>Source de données</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross icone" onClick={handleCrossClick}></img>
            </label>

            <select id="choixSourceDonnees" onChange={handleSourceDonnees} disabled={loading}>
                <option value="">{loading ? "Chargement..." : "Choisissez un jeu de données"}</option>
                {jeuDonnees.map((jd) => (
                    <option key={jd.id} value={jd.id}>
                        {jd.nom || 'nom jeu de données'}
                    </option>
                ))}
            </select>


            
            {selectedData && (
                <div className="zoneCheck">
                    <h2>Variables</h2>
                    {/* faire boucle -> récupérer toutes les variables liées au jeu de données choisi*/}
                    {variables.map(variable => {
                        return <Variables 
                                    key={variable.id} 
                                    nom={variable.nom} 
                                    type={variable.type}
                                    onCheck = {(checked)=>handleCheckVariables(variable, checked)}
                                    onColorChange={(color)=>handleColorChoice(variable.id,color)}
                                />
                    })}
                </div>
            )}         


            <label htmlFor="choixTypeGraphique"><h2>Type de graphique</h2></label>
            <select id="choixTypeGraphique" onChange={handleChoixTypeGraphique}>
                <option value="">Choisissez le type de graphique</option>
                {/* <hr></hr> */}
                <option value="pie chart" disabled={selectedVariables.length !== 1}>pie chart</option>
                <option value="bar chart">bar chart</option>
                <option value="line chart">line chart</option>
            </select>

            <label htmlFor="choixNomGraphique"><h2>Nom du graphique</h2></label>
            <input type="text" id="choixNomGraphique" value={nomG} onChange={handleChangeNom} required/>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Pour envoyer en BDD et à l'article ? */}
            {/* <button type="button"
                    onClick={handleValidateGraphic}
                    disabled={loading} 
                >
                    {loading ? "Upload..." : "Valider le graphique"}
                </button> */}
        </div>
    )
}

export {SourceDonnees}