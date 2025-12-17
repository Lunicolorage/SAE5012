
function Texte({article, setArticle}){

    function handleTexteChange(e){
        setArticle({
            ...article,
            sections:[{
                ...article.sections,
                type:"texte",
                contenu:{
                    contenu: e.target.value
                }
            }]
        })
    }

    return(
        <div className="zoneChoixTexte">
            {/* rajouter la croix dans le coin droit */}
            <label htmlFor="choixTexte">
                <h2>Texte</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross"></img>
            </label>
            <textarea id="choixTexte" rows="4" onChange={handleTexteChange}></textarea>
        </div>
    )
}

export {Texte};