function ArticleIndex({ article, onArticleClick }) {
  return (
    <div className="article">
      <h2>{article.titre}</h2>
      <p>{article.resume}</p>
      <button 
        className="buttonArticle"
        onClick={() => onArticleClick(article.id)}
      >
        Voir l'article
      </button>
    </div>
  );
}

export { ArticleIndex };
