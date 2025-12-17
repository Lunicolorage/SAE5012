import { TitreResume } from "./TitreResume";
import { Texte } from "./Texte";
import { SousTitre } from "./SousTitre";
import { Image } from "./Image";
import { SourceDonnees } from "./SourceDonnees";
import { AjoutBloc } from "./AjoutBloc";
import { useState } from "react";


function PageCreationArticle(){
    const [showAjoutBloc, setShowAjoutBloc] = useState(false)
    const [article, setArticle] = useState([])

    function handleClick(){
        setShowAjoutBloc(true);
    }

    // faire un tableau pour gérer affichage blocs

    return(
        <div className="pageCreationArticle">
            <h1>Création d'article</h1>

            <div className="blocs">
                <TitreResume />

                <Texte/>

                <SousTitre/>

                <Image/>

                <SourceDonnees/>

                {showAjoutBloc && <AjoutBloc />}

                <div className="buttonsCreation">
                    <button className="buttonAjout" onClick={handleClick}>Ajouter un bloc</button>
                    <button className="buttonPublier">Publier</button>
                </div>
            </div>
        </div>
    )
}

export {PageCreationArticle}