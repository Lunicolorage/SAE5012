
// à voir pour transmettre article + comment aller page de l'article
function Articles(articles){ 

    // function handleClick(){} // à voir

    return(
        <div class="allArticles">
            {/* {articles.map((article) =>(
                <div>
                    <h2>{article.nom}</h2>
                    <p>{article.resume}</p>
                    <button className="buttonArticle" onClick={() => handleClick(article.id)}>Voir l'article</button>
                </div>
            ))} */}

            <div className="article">
                <h2>Titre</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat felis vel orci viverra elementum. Phasellus ornare viverra mollis. Maecenas tempor in urna sed aliquet. Nam semper tempus imperdiet. Suspendisse sit amet ligula quis nulla consectetur dapibus. Duis dignissim pretium massa, et ornare risus sodales hendrerit. Cras egestas condimentum pellentesque. Proin ornare, ligula fringilla elementum porttitor, velit justo suscipit ligula, dapibus laoreet massa...</p>
                <button className="buttonArticle">Voir l'article</button>
            </div>

            <div className="article">
                <h2>Titre</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat felis vel orci viverra elementum. Phasellus ornare viverra mollis. Maecenas tempor in urna sed aliquet. Nam semper tempus imperdiet. Suspendisse sit amet ligula quis nulla consectetur dapibus. Duis dignissim pretium massa, et ornare risus sodales hendrerit. Cras egestas condimentum pellentesque. Proin ornare, ligula fringilla elementum porttitor, velit justo suscipit ligula, dapibus laoreet massa...</p>
                <button className="buttonArticle">Voir l'article</button>
            </div>

            <div className="article">
                <h2>Titre</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat felis vel orci viverra elementum. Phasellus ornare viverra mollis. Maecenas tempor in urna sed aliquet. Nam semper tempus imperdiet. Suspendisse sit amet ligula quis nulla consectetur dapibus. Duis dignissim pretium massa, et ornare risus sodales hendrerit. Cras egestas condimentum pellentesque. Proin ornare, ligula fringilla elementum porttitor, velit justo suscipit ligula, dapibus laoreet massa...</p>
                <button className="buttonArticle">Voir l'article</button>
            </div>

            <div className="article">
                <h2>Titre</h2>
                <p>Résumé</p>
                <button className="buttonArticle">Voir l'article</button>
            </div>


        </div>
    )
}

export {Articles};