
function Image({article, setArticle}){

    function handleImageChange(e){
        const imageUrl = e.target.value;

        setArticle({
             ...article,
            sections:[
                ...article.sections,
                {
                    type: "image",
                    contenu: {
                        url: imageUrl, //remplacer par bon url
                        alt: "description" // remplacer par bonne description
                    }
                }
            ]   
        })
    }


    function handleAjoutImageChange(e){
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const imageAlt = file.name;

            setArticle({
                ...article,
                sections:[
                    ...article.sections,
                    {
                        type: "image",
                        contenu: {
                            url: imageUrl, 
                            alt: imageAlt
                        }
                    }
                ]   
            })
        }
    }



    return(
        <div className="zoneChoixImage">
            <label htmlFor="choixImage">
                <h2>Image</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross"></img>
            </label>
            <div className="selectionImage">
                <select id="choixImage" onChange={handleImageChange}>
                    <option value="url">image stockée 1</option>
                    <option value="url">image stockée 2</option>
                    <option value="url">image stockée 3</option>
                </select>
                {/* <button className="ajoutImage">Ajouter une image</button> */}
                <input type="file" id="ajoutImage" name="ajoutImage" accept=".jpg, .png" onChange={handleAjoutImageChange}/>
            </div>
        </div>
    )
}

export {Image};