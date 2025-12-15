
function Texte(){
    return(
        <div className="zoneChoixTexte">
            {/* rajouter la croix dans le coin droit */}
            <label htmlFor="choixTexte"><h2>Texte</h2></label>
            <textarea id="choixTexte" rows="4"></textarea>
        </div>
    )
}

export {Texte};