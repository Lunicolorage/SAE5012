import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SectionArticle } from "./SectionArticle";

function AffichageArticle(){

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contenuArticle, setContenuArticle] = useState({});

    // console.log(id)

    useEffect(() => {
        async function getData() {
          const url = 'http://localhost:8000/api/articles/'+id+'/full';
          try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            // console.log(result);
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

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    //console.log(contenuArticle.sections);

    return(
        <div>
            {/* à voir, tab d'objet d'objets */}
            <h1>{contenuArticle.titre}</h1>
            <p> {new Date(contenuArticle.createdAt).toLocaleDateString('fr-FR')} - {contenuArticle.user.nom}</p> 

            {contenuArticle.sections
                .sort((a, b) => a.ordre - b.ordre)
                .map((section) => (
                    <SectionArticle 
                    key={section.id} 
                    section={section} />
                ))
            }

            {/* <p>texte</p>
            <h2>Sous-titre</h2>
            <p>suite du texte</p> */}

            {/* <img></img> ou graphique*/}

            {/* <canvas id="graphique" width="640" height="250"></canvas> */}

        </div> 
    )
}

export {AffichageArticle};