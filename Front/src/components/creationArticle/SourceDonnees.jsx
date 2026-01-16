import { Variables } from "./Variables"
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../context/UserProvider";

function SourceDonnees({article, setArticle, index}){
    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [jeuDonnees, setJeuDonnees] = useState([]);
    const [variables, setVariables] = useState([]);
    const [selectedVariables, setSelectedVariables] = useState([]);


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

    // pas fini, en cours de tests
    function handleCheckVariables(variable, checked){
        setSelectedVariables((prev) => {
            if(checked) {
                // si cochée -> copie déjà là + ajoute celle qu'on vient de cocher
                // vars = [...prev, variable];
                const existing = prev.find(v => v.id === variable.id);
                return existing ? prev : [...prev, {...variable, backgroundColor: "#ff0000"}]
            } else {
                // sinon -> garde tout sauf celle qu'on décoche
                return prev.filter(v => v.id !== variable.id);
            }
        })

        setArticle(prev => {
            const sections = [...prev.sections]; 
            const prevDatasets = sections[index].contenu.datasets || [];

            const newDatasets = checked
                ? [...prevDatasets, { variableId: variable.id, label: variable.nom, backgroundColor: variable.backgroundColor || "#ff0000" }]
                : prevDatasets.filter(ds => ds.variableId !== variable.id);

            sections[index] = {
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    datasets: newDatasets
                }
            }
            return {...prev, sections}
        })

    }
 
    // pas fini, en cours de tests
    function handleColorChoice(variableId, color){ // à voir
        console.log(color); // récupère bien couleur (hexa)

        setSelectedVariables(prev => prev.map(v => v.id == variableId ? {...v, backgroundColor: color} : v))

        setArticle(prev => {
            const sections = [...prev.sections];

            const prevDatasets = sections[index].contenu.datasets || [];

            const newDatasets = prevDatasets.map((nd) =>{
                return nd.variableId == variableId ? {...nd, backgroundColor: color} : nd;
            } )

            sections[index]={
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    datasets: newDatasets,
                    // [
                    //     {
                    //         // ...sections[index].contenu.datasets,
                    //         // backgroundColor: color,

                    //     }
                    // ],
                }
            }
            return {...prev, sections}
        })
    }

    
    // ok
    function handleChoixTypeGraphique(e){
        const typeGraphic = e.target.value;

        if (typeGraphic==""){
            return;
        }

        console.log(typeGraphic);

        setArticle(prev => {
            const sections = [...prev.sections];

            sections[index] = {
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    type: typeGraphic,
                }
            }
            return {...prev, sections}
        })
    }

    // semble ok -> à voir après
    async function handleSourceDonnees(e){
        const donneesId = e.target.value;
        // console.log("donnees : ", donneesId);
        const dataset = jeuDonnees.find(jd => jd.id == donneesId);
        setSelectedData(dataset);
        console.log(dataset);
        setLoading(true);
        setError('');

        setArticle(prev => {
            const sections = [...prev.sections];

            sections[index]={
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    // à voir -> faire en fonction type de graphiques ?
                    labels: [],
                    datasets: [],
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

    

    async function handleValidateGraphic(){
        // pour mettre tout bien dans toutes les tables BDD ? (notamment jeu_donnees)
        setError('');
        setLoading(true);

        // try{

        // }
    }





    function handleCrossClick(){
        const indexToRemove = index;
        const sections = article.sections.filter((section, i)=> i!= indexToRemove)
        setArticle({...article, sections: sections})
    }
    

    return(
        <div className="zoneSourceDonnees">

            <label htmlFor="choixSourceDonnees">
                <h2>Source de données</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross" onClick={handleCrossClick}></img>
            </label>

            <select id="choixSourceDonnees" onChange={handleSourceDonnees} disabled={loading}>
                <option value="">{loading ? "Chargement..." : "Choisissez un jeu de données"}</option>
                {jeuDonnees.map((jd) => (
                    <option key={jd.id} value={jd.id}>
                        {jd.nom || 'nom jeu de données'}
                    </option>
                ))}
            </select>

            {/* à faire dynamiquement*/}
            
            {selectedData && (
                <div className="zoneCheck">
                    <h2>Variables</h2>
                    {/* faire boucle -> récupérer toutes les variables liées au jeu de données choisi*/}
                    {variables.map(variable => {
                        return <Variables 
                                    key={variable.id} 
                                    nom={variable.nom} 
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
                <option>pie chart</option>
                <option>bar chart</option>
                <option>histogram</option>
            </select>

            {/* Pour envoyer en BDD et à l'article ? */}
            <button type="button"
                    onClick={handleValidateGraphic}
                    disabled={loading} 
                >
                    {loading ? "Upload..." : "Valider le graphique"}
                </button>
        </div>
    )
}

export {SourceDonnees}