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

    const [jeuDonnees, setJeuDonnees] = useState([]);


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



    function handleChoixTypeGraphique(){}


    function handleSourceDonnees(e){
        const donnees = e.target.value;
        // console.log("donnees : ", donnees);

        const selectedData = jeuDonnees.find(jd => jd.id == donnees);
        // console.log(selectedData.variables); // récupérer variables pour zoneCheck

        setArticle(prev => {
            const sections = [...prev.sections];

            sections[index]={
                ...sections[index],
                type: "graphique",
                contenu: {
                    ...sections[index].contenu,
                    // à voir -> faire en fonction type de graphiques ?
                }
            }
            return {...prev, sections}
        })
    }

    async function handleValidateGraphic(){
        // pour mettre tout bien dans toutes les tebles ? (notamment jeu_donnees)
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
            <div className="zoneCheck">
                <h2>Variables</h2>
                {/* faire boucle ? récupérer toutes les variables liées au jeu de données choisi*/}

                <Variables nom={"nom"}/>
                <Variables nom={"var 2"}/>
                <Variables nom={"var 3"}/>
                <Variables nom={"var 4"}/>                
            </div>


            <label htmlFor="choixTypeGraphique"><h2>Type de graphique</h2></label>
            <select id="choixTypeGraphique" onChange={handleChoixTypeGraphique}>
                <option value="">Choisissez le type de graphique</option>
                {/* <hr></hr> */}
                <option>pie chart</option>
                <option>bar chart</option>
                <option>histogram</option>
            </select>

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