
function TitreResume(){
    return(
        <div className="titreResume">
            <div className="zoneChoixTitre">
                <label htmlFor="choixTitre"><h2>Titre</h2></label>
                <input id="choixTitre" type="text"></input>
            </div>
            
            <div className="zoneChoixResume">
                <label htmlFor="choixResume"><h2>Résumé</h2></label>
                <textarea id="choixResume" rows="4"></textarea>
            </div>
        </div>
    )
}

export {TitreResume};