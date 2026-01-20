
function SousTitre({article, setArticle, index}){

    function handleSousTitreChange(e){
        setArticle(prev => {
            const sections = [...prev.sections]

            sections[index] = {
                ...sections[index],
                type:"titre",
                contenu:{
                    ...sections[index].contenu,
                    texte: e.target.value
                }
            }
            return {...prev, sections}
        })
    }

    function handleTypeChange(e){
        setArticle(prev => {
            const sections = [...prev.sections]

            sections[index] = {
                ...sections[index],
                type:"titre",
                contenu:{
                    ...sections[index].contenu,
                    hierarchie: e.target.value
                }
            }
            return {...prev, sections}
        })
    }

    function handleCrossClick(){
        const indexToRemove = index;
        const sections = article.sections.filter((section, i)=> i!= indexToRemove)
        setArticle({...article, sections: sections})
    }


    return(
        <div className="zoneChoixSousTitre">
            <label htmlFor="choixSousTitre">
                <h2>Sous-titre</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross icone" onClick={handleCrossClick}></img>
            </label>
            <select onChange={handleTypeChange}>
                <option value="">Choisissez le niveau de titre</option>
                <option value="h2">Titre 2</option>
                <option value="h3">Titre 3</option>
                <option value="h4">Titre 4</option>
            </select>
            <input id="choixSousTitre" type="text" onChange={handleSousTitreChange}></input>
        </div>
    )
}

export {SousTitre};