import { useState, useEffect } from "react";

import { Texte } from "../creationArticle/Texte";
import { SousTitre } from "../creationArticle/SousTitre";
import { Image } from "../creationArticle/Image";
import { SourceDonnees } from "../creationArticle/SourceDonnees";
import { TitreResume } from "../creationArticle/TitreResume";
import { AjoutBloc } from "../creationArticle/AjoutBloc";

export function ModifierArticle({contenuArticle, setContenuArticle, id, setOnModifier, OnModifier}){

    const [showAjoutBloc, setShowAjoutBloc] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    function handleClick(){
        setShowAjoutBloc(true);
    }
    
    // faire un tableau pour gérer affichage blocs
    const [article, setArticle] = useState({titre:contenuArticle.titre, Resume:contenuArticle.Resume, userName:contenuArticle.user.nom, sections:[]})

    useEffect(() => {
    setArticle({
        titre: contenuArticle.titre,
        Resume: contenuArticle.Resume,
        userName: contenuArticle.user?.nom || "",
        sections: contenuArticle.sections || []
        });
    }, [contenuArticle]);

    const handleClickSubmit = async () => {
        console.log(article);
    };
    
    return(
        <div className="pageModifierArticle">
            <h1>Modifier l'article {id}</h1>
            <button
                onClick={()=> setOnModifier(!OnModifier)}
            >Retour</button>

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
                        case "graphique":
                            return (<SourceDonnees  key={index} index={index} article={article} setArticle={setArticle}/>)
                        default:
                            return null;
                    }
                })}

                {/* <SourceDonnees article={article} setArticle={setArticle}/> */}

                {showAjoutBloc && <AjoutBloc  article={article} setArticle={setArticle} clickCross={setShowAjoutBloc}/>}
                {/* {console.log(article)} */}

                <div className="buttonsCreation">
                    <button className="buttonAjout" onClick={handleClick}>
                        Ajouter un bloc
                    </button>
                    <button type="submit" className="buttonPublier" onClick={handleClickSubmit} disabled={loading || !article.titre.trim() || !article.Resume.trim()}>
                        {loading ? "Modification..." :"Modifier"}
                    </button>
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
            </div>
        </div>
    )
}