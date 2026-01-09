import { TitreResume } from "./TitreResume";
import { Texte } from "./Texte";
import { SousTitre } from "./SousTitre";
import { Image } from "./Image";
import { SourceDonnees } from "./SourceDonnees";
import { AjoutBloc } from "./AjoutBloc";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";


function PageCreationArticle(){
    const [showAjoutBloc, setShowAjoutBloc] = useState(false)
    const [user, setUser] = useContext(UserContext);
    // faire un tableau pour gérer affichage blocs
    const [article, setArticle] = useState({titre:"", Resume:"", userName:`${user.nom}`, sections:[]})

    // à voir
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleClick(){
        setShowAjoutBloc(true);
    }

    // console.log(localStorage);

    const handleClickSubmit = async () => {
        console.log(article)
        setError('');
        setSuccess('');
        setLoading(true);

        console.log(user);
        console.log(JSON.stringify(article)); // ok

        try {
            const response = await fetch('http://localhost:8000/api/articles/import', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(article),
            });
        
            if (!response.ok) {
                setError('Erreur ');
            }
            else{
                setSuccess('Article publié') 
            }
           
        } catch (err) {
            setError(` Erreur : ${err.message}`);
        } finally {
            setLoading(false);
        }
        
    }

    
    return(
        <div className="pageCreationArticle">
            <h1>Création d'article</h1>

            <div className="blocs">
                <TitreResume article={article} setArticle={setArticle}/>

                {article.sections.map((section, index)=>{
                    switch (section.type){ // pour juste afficher les blocs sélectionnés
                        case "texte":
                            return (<Texte key={index} index={index} article={article} setArticle={setArticle}/>)
                        case "titre":
                            return (<SousTitre key={index} index={index} article={article} setArticle={setArticle}/>)
                        case "image":
                            return (<Image key={index} index={index} article={article} setArticle={setArticle}/>)
                        
                        default:
                            return null;
                    }
                })}

                <SourceDonnees article={article} setArticle={setArticle}/>

                {showAjoutBloc && <AjoutBloc  article={article} setArticle={setArticle} clickCross={setShowAjoutBloc}/>}
                {/* {console.log(article)} */}

                <div className="buttonsCreation">
                    <button className="buttonAjout" onClick={handleClick}>Ajouter un bloc</button>
                    <button type="submit" className="buttonPublier" onClick={handleClickSubmit}>Publier</button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
        </div>
    )
}

export {PageCreationArticle}