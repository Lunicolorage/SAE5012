import { useEffect, useState } from "react";
import { ArticleIndex } from "./ArticleIndex";

function Articles() {
  const [listeArticles, setListeArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="allArticles">Chargement...</div>;
  if (error) return <div className="allArticles">Erreur: {error}</div>;

  return (
    <div className="allArticles">
      {listeArticles.map((article) => (
        <ArticleIndex key={article.id} article={article} />
      ))}
    </div>
  );
}

export { Articles };