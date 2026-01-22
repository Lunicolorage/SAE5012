
function Texte({article, setArticle, index}){

    function handleTexteChange(e){

        setArticle(prev =>{
            const sections = [...prev.sections];

            sections[index] = {
                ...sections[index],
                type:"texte",
                contenu:{
                    contenu: e.target.value
                }
            }
            return {...prev, sections}
        })
    }

    //récupere les info pour le modifier
    const currentContent = article.sections[index]?.contenu?.contenu || "";

    function handleCrossClick(){
        const indexToRemove = index;
        const sections = article.sections.filter((section, i)=> i!= indexToRemove)
        setArticle({...article, sections: sections})
    }

    return(
        <div className="zoneChoixTexte">
            {/* rajouter la croix dans le coin droit */}
            <label htmlFor="choixTexte">
                <h2>Texte</h2>
                <img src="/src/assets/croix.png" alt="fermer" className="cross icone" onClick={handleCrossClick}></img>
            </label>
            <textarea id="choixTexte" rows="4" value={currentContent} onChange={handleTexteChange}></textarea>
        </div>
    )
}

export {Texte};