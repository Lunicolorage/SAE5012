import { useEffect, useState, useContext } from "react";
import { AffichageArticle } from "./AffichageArticle";
import { useParams } from "react-router-dom";

export function UnArticle(){
    const { id } = useParams();

    const [OnModifier, setOnModifier] = useState('false');

    const [contenuArticle, setContenuArticle] = useState({});

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        async function getData() {
          const url = 'http://localhost:8000/api/articles/'+id+'/full';
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setContenuArticle(result);
          } catch (err) {
            setError(err.message);
            console.error(err.message);
          } finally {
            setLoading(false);
          }
        }
    
        getData();
    }, []); 
    //récupère les données de l'article avec une requete custom

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;
    
    if (!OnModifier){
    return('page modif')
            
    }
    else{
        return(
            <AffichageArticle 
                id={id}
                contenuArticle={contenuArticle}
                setContenuArticle={setContenuArticle}
                setOnModifier={setOnModifier}
                OnModifier={OnModifier}
            />
        )
    }
}