
function SousTitre({article, setArticle}){

    //à voir 
    function handleSousTitreChange(e){
        setArticle({
            ...article,
            sections:[
                ...article.sections,
                {
                    type: "titre",
                    contenu:{
                        texte: e.target.value,
                        ...article.sections.contenu
                    }
                }
            ]
        })
    }

    function handleTypeChange(e){
        setArticle({
            ...article,
            sections:[
                ...article.sections,
                {
                    type: "titre",
                    contenu:{
                        ...article.sections.contenu,
                        hierarchie: e.target.value
                    }
                }
            ]
        })
    }

    return(
        <div className="zoneChoixSousTitre">
            <label htmlFor="choixSousTitre">
                <h2>Sous-titre</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross"></img>
            </label>
            <select onChange={handleTypeChange}>
                <option value="h2">Titre 2</option>
                <option value="h3">Titre 3</option>
                <option value="h4">Titre 4</option>
            </select>
            <input id="choixSousTitre" type="text" onChange={handleSousTitreChange}></input>
        </div>
    )
}

export {SousTitre};