import { useEffect, useState, useContext } from "react";
import { SectionArticle } from "./SectionArticle";
import { UserContext } from "../../context/UserProvider";
import Rating from '@mui/material/Rating';
import { BoutonNotation } from "./BoutonNotation";
import { BoutonModif } from "./BoutonModif";
import { BoutonSuppr } from "./BoutonSuppr";

function AffichageArticle({contenuArticle, setContenuArticle, id, setOnModifier, OnModifier}){

    const getCSSVariable = (variable) => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();
    };
    // permet de récuperer une variable css

    const SuppArticleAllowed = ['ROLE_ADMIN','ROLE_EDIT'];

    const [IsTheAuthor, setIsTheAuthor] = useState(false);


    const [user, setUser] = useContext(UserContext);
    const addNoteAllowed = ['ROLE_ADMIN','ROLE_ABO'];
    const hasAnyRole = (allowed) => Array.isArray(user?.roles) && user.roles.some(r => allowed.includes(r));
    //verifie que le role autorise la fonctionnalité

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
            
            //verifie si l'utilisateur est l'auteur de l'article
        } catch (err) {
            console.error(err.message);
        }
    };
    //récupère les données après avoir ajouté une note

    useEffect(() => {
        // Vérifie si l'utilisateur est l'auteur de l'article
        if (contenuArticle.user){
          setIsTheAuthor(contenuArticle.user.id === user.id);
          //console.log(user);
        }

        if (contenuArticle.notes && Array.isArray(contenuArticle.notes)) {
          contenuArticle.notes.forEach(note => {
            let idNoteUser = note.user.split('/').pop();
            if (idNoteUser === String(user.id)) {
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
    

    return(
        <div className="articleComplet">
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
            
            {(hasAnyRole(SuppArticleAllowed) || IsTheAuthor) && (
            <div className="BoutonsUnArticle">
              {/* < BoutonModif setOnModifier={setOnModifier} OnModifier={OnModifier}/> */}
              < BoutonSuppr article ={contenuArticle}/>
            </div>
            )}

            {contenuArticle.sections
                .sort((a, b) => a.ordre - b.ordre) // verifie que les sections sont dans le bon ordre
                .map((section) => (
                    <SectionArticle 
                    key={section.id} 
                    section={section} 
                    couleur={getCSSVariable} />
                ))
            }
        </div> 
    )
}

export {AffichageArticle};