
// à voir pour transmettre article + comment aller page de l'article
function Article(articles){ 

    function handleClick(){} // à voir

    return(
        <main>
            {articles.map((article) =>(
                <div>
                    <h2>{article.nom}</h2>
                    <p>{article.resume}</p>
                    <button onClick={handleClick(article.id)}>Voir l'article</button>
                </div>
            ))}
        </main>
    )
}

export {Article};