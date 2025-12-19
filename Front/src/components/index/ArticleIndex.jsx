function ArticleIndex(article){ 

    // console.log(article.article.id);

    return(
        <div className="article">
                <h2>{article.article.titre}</h2>
                <p>{article.article.resume}</p>
                <button className="buttonArticle">Voir l'article</button>
            </div>
    )

}

export {ArticleIndex};