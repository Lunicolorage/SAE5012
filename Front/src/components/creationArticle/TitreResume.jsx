
function TitreResume({article, setArticle}){

    function handleTitreChange(e){
        setArticle({
            ...article,
            titre: e.target.value
        })
    }

    function handleResumeChange(e){
        setArticle({
            ...article,
            resume: e.target.value
        })
    }

    return(
        <div className="titreResume">
            <div className="zoneChoixTitre">
                <label htmlFor="choixTitre">
                    <h2>Titre</h2>
                </label>
                <input id="choixTitre" type="text" onChange={handleTitreChange}></input>
            </div>
            
            <div className="zoneChoixResume">
                <label htmlFor="choixResume"><h2>Résumé</h2></label>
                <textarea id="choixResume" rows="4" onChange={handleResumeChange}></textarea>
            </div>
        </div>
    )
}

export {TitreResume};