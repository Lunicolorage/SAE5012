
function AjoutBloc(){
    return(
        <div className="zoneAjoutBloc">
            <div className="zoneTitreAjoutBloc">
                <h2>Quel bloc ajouter ?</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross"></img>
            </div>
            <select name="choixBloc" id="choixBloc">
                <option value="texte">Texte</option>
                <option value="sousTitre">Sous-titre</option>
                <option value="img">Image</option>
                <option value="graphique">Graphique</option>
            </select>
            <button type="submit">Ajouter</button>
        </div>
    )
}

export {AjoutBloc}