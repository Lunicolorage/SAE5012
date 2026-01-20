import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { BoutonSupprIndex } from "./BoutonSupprIndex";

function ArticleIndex({ article, onArticleClick, listeArticles, setListeArticles }) {

  const [user, setUser] = useContext(UserContext);
  const SuppArticleAllowed = ['ROLE_ADMIN','ROLE_EDIT'];
  const hasAnyRole = (allowed) => Array.isArray(user?.roles) && user.roles.some(r => allowed.includes(r));
  //verifie que le role autorise la fonctionnalité
  //hasAnyRole(['ROLE_AUTEUR'] user.id==article.id

   const IsTheAuthor = article.user.split('/').pop() == user.id;
  // console.log(IsTheAuthor);

  return (
    <div className="article">
        <h2>{article.titre}</h2>
      <p>{article.resume}</p>
      <div className="indexVoirSupp">
        <button 
          className="buttonArticle"
          onClick={() => onArticleClick(article.id)}
        >
          Voir l'article
        </button>
        {(hasAnyRole(SuppArticleAllowed) || IsTheAuthor) && (
          <BoutonSupprIndex 
          article={article}
          listeArticles={listeArticles}
          setListeArticles={setListeArticles}
          
          />
        )}
      </div>
    </div>
  );
}

export { ArticleIndex };
