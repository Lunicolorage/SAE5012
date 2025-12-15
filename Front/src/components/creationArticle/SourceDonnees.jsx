
function SourceDonnees(){
    return(
        <div className="zoneSourceDonnees">
            <label htmlFor="choixSourceDonnees"><h2>Source de données</h2></label>
            <select id="choixSourceDonnees">
                <option>lien</option>
            </select>

            {/* à fair dynamiquement - faire attention rect couleurs */}
            {/* pour colors -> faire tableau avec color prédéfinie pour l'instant */}
            <div className="zoneCheck">
                <h2>Variables</h2>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label className="form-check-label" htmlFor="checkDefault">
                        var 1
                        <div className="rectColor"></div>
                    </label>
                    
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label className="form-check-label" htmlFor="checkDefault">
                        var 2
                        <div className="rectColor"></div>
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label className="form-check-label" htmlFor="checkDefault">
                        var 3
                        <div className="rectColor"></div>
                    </label>
                </div>
                 <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
                    <label className="form-check-label" htmlFor="checkDefault">
                        var 4
                        <div className="rectColor"></div>
                    </label>
                </div>
            </div>


            <label htmlFor="choixTypeGraphique"><h2>Type de graphique</h2></label>
            <select id="choixTypeGraphique">
                <option>type 2</option>
            </select>
        </div>
    )
}

export {SourceDonnees}