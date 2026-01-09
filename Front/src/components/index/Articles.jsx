import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArticleIndex } from "./ArticleIndex";

function Articles() {
  const [listeArticles, setListeArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const url = 'http://localhost:8000/api/articles';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        setListeArticles(result.member);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []); 

  const handleArticleClick = (articleId) => {
    navigate(`/article/${articleId}`);
  };

  if (loading) return <div className="allArticles">Chargement...</div>;
  if (error) return <div className="allArticles">Erreur: {error}</div>;

  return (
    <div className="allArticles">
      {listeArticles
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map((article) => (
        <ArticleIndex 
          key={article.id} 
          article={article}
          onArticleClick={handleArticleClick}
        />
      ))}
    </div>
  );
}

export { Articles };