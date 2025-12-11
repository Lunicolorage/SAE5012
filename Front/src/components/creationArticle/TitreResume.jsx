
function TitreResume(){
    return(
        <div className="titreResume">
            <div className="zoneChoixTitre">
                <label htmlFor="choixTitre">Titre</label>
                <input id="choixTitre" type="text"></input>
            </div>
            
            <div className="zoneChoixResume">
                <label htmlFor="choixResume">Résumé</label>
                <textarea id="choixResume" rows="4"></textarea>
            </div>
        </div>
    )
}

export {TitreResume};