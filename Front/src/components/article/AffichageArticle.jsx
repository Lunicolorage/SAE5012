import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SectionArticle } from "./SectionArticle";
import { UserContext } from "../../context/UserProvider";
import Rating from '@mui/material/Rating';

function AffichageArticle(){

    const { id } = useParams();

    const [user, setUser] = useContext(UserContext);
    const addNoteAllowed = ['ROLE_ADMIN','ROLE_ABO'];
    const hasAnyRole = (allowed) => Array.isArray(user?.roles) && user.roles.some(r => allowed.includes(r));

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

    // console.log(contenuArticle);

    return(
        <div>
            {/* à voir, tab d'objet d'objets */}
            <div className="titreArticle">
              <h1>{contenuArticle.titre}</h1>
              <div className="notationArticle">
                  <Rating 
                    className="etoiles-rating"
                    name="etoiles-rating" 
                    value={contenuArticle.noteMoyenne || 0} 
                    precision={0.1} 
                    sx={{ 
                      color: "#7AC74F",
                    }}
                    readOnly
                  />
                {hasAnyRole(addNoteAllowed) && (
                  <button>Noter</button>
                )}
              </div>
            </div>
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