import { TitreResume } from "./TitreResume";
import { Texte } from "./Texte";
import { SousTitre } from "./SousTitre";
import { Image } from "./Image";
import { SourceDonnees } from "./SourceDonnees";
import { AjoutBloc } from "./AjoutBloc";


function PageCreationArticle(){
    return(
        <div className="pageCreationArticle">
            <h1>Création d'article</h1>

            <div className="blocs">
                <TitreResume/>

                <Texte/>

                <SousTitre/>

                <Image/>

                <SourceDonnees/>

                <div className="buttonsCreation">
                    <button className="buttonAjout">Ajouter un bloc</button>
                    <button className="buttonPublier">Publier</button>
                </div>
            </div>
        </div>
    )
}

export {PageCreationArticle}