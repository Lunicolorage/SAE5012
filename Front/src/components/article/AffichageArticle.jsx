

function AffichageArticle(article){
    return(
        <div>
            {/* à voir, tab d'objet d'objets */}
            <h1>{article.titre}</h1>
            {/* <p>{article.texte.id}</p> ? */}

            <p>texte</p>
            <h2>Sous-titre</h2>
            <p>suite du texte</p>

            {/* <img></img> ou graphique*/}

            {/* <canvas id="graphique" width="640" height="250"></canvas> */}

        </div> 
    )
}

export {AffichageArticle};