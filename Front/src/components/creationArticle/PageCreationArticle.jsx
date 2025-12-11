import { TitreResume } from "./TitreResume";
import { Texte } from "./Texte";
import { SousTitre } from "./SousTitre";
import { Image } from "./Image";
import { SourceDonnees } from "./SourceDonnees";


function PageCreationArticle(){
    return(
        <div>
            <h1>Création d'article</h1>

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
    )
}

export {PageCreationArticle}