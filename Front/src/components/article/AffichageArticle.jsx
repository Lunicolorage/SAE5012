

function AffichageArticle(article){
    return(
        <div>
            {/* à voir, tab d'objet d'objets */}
            <h1>{article.titre}</h1>
            <p>{article.texte.id}</p>
        </div> 
    )
}

export {AffichageArticle};