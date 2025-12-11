
function Texte(){
    return(
        <div className="zoneChoixTexte">
            {/* rajouter la croix dans le coin droit */}
            <label htmlFor="choixTexte">Texte</label>
            <textarea id="choixTexte" rows="4"></textarea>
        </div>
    )
}

export {Texte};