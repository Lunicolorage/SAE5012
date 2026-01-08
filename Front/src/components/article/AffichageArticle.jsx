import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, use } from "react";
import { SectionArticle } from "./SectionArticle";
import { UserContext } from "../../context/UserProvider";
import Rating from '@mui/material/Rating';
import { BoutonNotation } from "./BoutonNotation";

function AffichageArticle(){

    const { id } = useParams();

    const [user, setUser] = useContext(UserContext);
    const addNoteAllowed = ['ROLE_ADMIN','ROLE_ABO'];
    const hasAnyRole = (allowed) => Array.isArray(user?.roles) && user.roles.some(r => allowed.includes(r));

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contenuArticle, setContenuArticle] = useState({});

    const [canNote, setCanNote] = useState(true);
    const [noteMoyenne, setNoteMoyenne] = useState(0);

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

      useEffect(() => {
        if (contenuArticle.notes && Array.isArray(contenuArticle.notes)) {
          contenuArticle.notes.forEach(note => {
            let idNoteUser = note.user.split('/').pop();
            // console.log(idNoteUser);
            if (idNoteUser === user.id) {
              setCanNote(false);
            }
          });
        }

        if (contenuArticle.notes && contenuArticle.notes.length > 0) {
          const totalNotes = contenuArticle.notes.reduce((sum, note) => sum + note.valeur, 0);
          const average = totalNotes / contenuArticle.notes.length;
          setNoteMoyenne(average);
        }
      }, [contenuArticle, user]);



    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;


    return(
        <div>
            {/* à voir, tab d'objet d'objets */}
            <div className="titreArticle">
              <h1>{contenuArticle.titre}</h1>
              <div className="notationArticle">
                  <Rating 
                    className="etoiles-rating"
                    name="etoiles-rating" 
                    value={noteMoyenne} 
                    precision={0.1} 
                    sx={{ 
                      color: "#7AC74F",
                    }}
                    readOnly
                  />
                {hasAnyRole(addNoteAllowed) && canNote && (

                 <BoutonNotation />

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