import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SectionArticle } from "./SectionArticle";
import { UserContext } from "../../context/UserProvider";
import Rating from '@mui/material/Rating';
import { BoutonNotation } from "./BoutonNotation";

function AffichageArticle(){

    const getCSSVariable = (variable) => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();
    };
    // permet de récuperer une variable css

    const { id } = useParams();

    const [user, setUser] = useContext(UserContext);
    const addNoteAllowed = ['ROLE_ADMIN','ROLE_ABO'];
    const hasAnyRole = (allowed) => Array.isArray(user?.roles) && user.roles.some(r => allowed.includes(r));
    //verifie que le role autorise la fonctionnalité

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contenuArticle, setContenuArticle] = useState({});

    const [canNote, setCanNote] = useState(true);
    const [noteMoyenne, setNoteMoyenne] = useState(0);

    const handleNoteAdded = async () => {
        const url = 'http://localhost:8000/api/articles/'+id+'/full';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setContenuArticle(result);
        } catch (err) {
            console.error(err.message);
        }
    };
    //récupère les données après avoir ajouté une note

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

    useEffect(() => {
        if (contenuArticle.notes && Array.isArray(contenuArticle.notes)) {
          contenuArticle.notes.forEach(note => {
            let idNoteUser = note.user.split('/').pop();
            if (idNoteUser === user.id) {
              setCanNote(false);
            }
          });
        } // Vérifie si l'utilisateur n'a pas déjè noté l'article

        if (contenuArticle.notes && contenuArticle.notes.length > 0) {
          const totalNotes = contenuArticle.notes.reduce((sum, note) => sum + note.valeur, 0);
          const average = totalNotes / contenuArticle.notes.length;
          setNoteMoyenne(average);
        } // Récupère la moyenne des notes
    }, [contenuArticle, user]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return(
        <div>
            <div className="titreArticle">
              <h1>{contenuArticle.titre}</h1>
              <div className="notationArticle">
                  <Rating 
                    className="etoiles-rating"
                    name="etoiles-rating" 
                    value={noteMoyenne} 
                    precision={0.1} 
                    sx={{ 
                      color: getCSSVariable('--greenLight'),
                    }}
                    readOnly
                  />
                {hasAnyRole(addNoteAllowed) && canNote && (
                 <BoutonNotation 
                    articleId={contenuArticle.id}
                    OnNoteAdded={handleNoteAdded}
                    setCanNote={setCanNote}
                 />
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
        </div> 
    )
}

export {AffichageArticle};