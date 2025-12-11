
function Image(){
    return(
        <div className="zoneChoixImage">
            <label htmlFor="choixImage">Image</label>
            <div className="selectionImage">
                <select id="choixImage">
                    <option>image stockée 1</option>
                    <option>image stockée 2</option>
                    <option>image stockée 3</option>
                </select>
                {/* à voir -> input choix fichier ? */}
                <button className="ajoutImage">Ajouter une image</button>
            </div>
        </div>
    )
}

export {Image};