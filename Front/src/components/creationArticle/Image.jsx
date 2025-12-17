
function Image(){
    return(
        <div className="zoneChoixImage">
            <label htmlFor="choixImage">
                <h2>Image</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross"></img>
            </label>
            <div className="selectionImage">
                <select id="choixImage">
                    <option>image stockée 1</option>
                    <option>image stockée 2</option>
                    <option>image stockée 3</option>
                </select>
                {/* à voir -> input choix fichier ? */}
                {/* <button className="ajoutImage">Ajouter une image</button> */}
                <input type="file" id="ajoutImage" name="ajoutImage" accept=".jpg, .png"/>
            </div>
        </div>
    )
}

export {Image};