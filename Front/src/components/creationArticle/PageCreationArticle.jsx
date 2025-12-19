import { TitreResume } from "./TitreResume";
import { Texte } from "./Texte";
import { SousTitre } from "./SousTitre";
import { Image } from "./Image";
import { SourceDonnees } from "./SourceDonnees";
import { AjoutBloc } from "./AjoutBloc";
import { useState } from "react";


function PageCreationArticle(){
    const [showAjoutBloc, setShowAjoutBloc] = useState(false)
    // faire un tableau pour gérer affichage blocs
    const [article, setArticle] = useState({titre:"", Resume:"", username:"", sections:[]})

    function handleClick(){
        setShowAjoutBloc(true);
    }

    function handleClickSubmit(){
        console.log(article)
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
            </div>
        </div>
    )
}

export {PageCreationArticle}