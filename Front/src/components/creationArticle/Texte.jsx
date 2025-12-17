
function Texte(){
    // const [isBlocSelected, setIsBlocSelected] = useState(true)

    // function handleCrossClick(){
    //     setIsBlocSelected(false);
    // }

    return(
        <div className="zoneChoixTexte">
            {/* rajouter la croix dans le coin droit */}
            <label htmlFor="choixTexte">
                <h2>Texte</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross"></img>
            </label>
            <textarea id="choixTexte" rows="4"></textarea>
        </div>
    )
}

export {Texte};