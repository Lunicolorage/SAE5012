import { Variables } from "./Variables"

function SourceDonnees(){
    return(
        <div className="zoneSourceDonnees">
            <label htmlFor="choixSourceDonnees">
                <h2>Source de données</h2>
                <img src="src\assets\croix.png" alt="fermer"></img>
            </label>
            <select id="choixSourceDonnees">
                <option>lien 1</option>
                <option>lien 2</option>
                <option>lien 3</option>
                <option>lien n</option>
            </select>

            {/* à faire dynamiquement*/}
            <div className="zoneCheck">
                <h2>Variables</h2>
                <Variables nom={"nom"}/>
                <Variables nom={"var 2"}/>
                <Variables nom={"var 3"}/>
                <Variables nom={"var 4"}/>                
            </div>


            <label htmlFor="choixTypeGraphique"><h2>Type de graphique</h2></label>
            <select id="choixTypeGraphique">
                <option>pie chart</option>
                <option>bar chart</option>
                <option>histogram</option>
            </select>
        </div>
    )
}

export {SourceDonnees}