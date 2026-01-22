import { useState, useEffect } from "react";

function TitreResume({article, setArticle}){
    const [titreValue, setTitreValue] = useState('');
    const [resumeValue, setResumeValue] = useState('');

    // Initialiser les valeurs pré-remplies
    useEffect(() => {
        setTitreValue(article.titre || '');
        setResumeValue(article.Resume || '');
    }, [article.titre, article.Resume]);

    function handleTitreChange(e){
        setTitreValue(e.target.value);
        setArticle({
            ...article,
            titre: e.target.value
        })
    }

    function handleResumeChange(e){
        setResumeValue(e.target.value);
        setArticle({
            ...article,
            Resume: e.target.value
        })
    }

    return(
        <div className="titreResume">
            <div className="zoneChoixTitre">
                <label htmlFor="choixTitre">
                    <h2>Titre</h2>
                </label>
                <input 
                    id="choixTitre" 
                    type="text" 
                    value={titreValue}
                    onChange={handleTitreChange}
                ></input>
            </div>
            
            <div className="zoneChoixResume">
                <label htmlFor="choixResume"><h2>Résumé</h2></label>
                <textarea 
                    id="choixResume" 
                    rows="4" 
                    value={resumeValue}
                    onChange={handleResumeChange}
                ></textarea>
            </div>
        </div>
    )
}

export {TitreResume};