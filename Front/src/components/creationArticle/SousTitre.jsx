
function SousTitre(){
    return(
        <div className="zoneChoixSousTitre">
            <label htmlFor="choixSousTitre">
                <h2>Sous-titre</h2>
                <img src="src\assets\croix.png" alt="fermer"></img>
            </label>
            <select>
                <option value="titre2">Titre 2</option>
                <option value="titre3">Titre 3</option>
                <option value="titre4">Titre 4</option>
            </select>
            <input id="choixSousTitre" type="text"></input>
        </div>
    )
}

export {SousTitre};