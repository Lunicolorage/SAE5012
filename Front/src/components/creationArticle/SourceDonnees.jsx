
function SourceDonnees(){
    return(
        <div className="zoneSourceDonnees">
            <label htmlFor="choixSourceDonnees">Source de données</label>
            <select id="choixSourceDonnees">
                <option>lien</option>
            </select>

            {/* à finir */}
            <label>Variables</label>
            <input type="checkbox">var 1</input>


            <label htmlFor="choixTypeGraphique">Type de graphique</label>
            <select id="choixTypeGraphique">
                <option>type 2</option>
            </select>
        </div>
    )
}

export {SourceDonnees}