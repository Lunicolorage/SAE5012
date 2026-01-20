import React, { useState, useContext } from 'react';
import { UserContext } from "../../context/UserProvider";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

function BoutonNotation({ articleId, OnNoteAdded, setCanNote }) {
    const [openNote, setOpenNote] = useState(false);
    const [noteValue, setNoteValue] = useState(0);
    const [user] = useContext(UserContext);

    const getCSSVariable = (variable) => {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();
    };
    // permet de récuperer une variable css

    async function PostNoteApi(note) {
        const url = 'http://localhost:8000/api/notes';
        
        const data = {
            valeur: note,
            article: `/api/articles/${articleId}`,
            user: `/api/users/${user.id}`
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Note ajoutée avec succès:');
            
            OnNoteAdded();
            setCanNote(false);
            
        } catch (err) {
            console.error('Erreur lors de l\'ajout de la note:', err.message);
        }
    }
    // Ajoute la note dans l'api

    function PostNote() {
        PostNoteApi(noteValue);
        setOpenNote(false);
    }

    return (
        <>
            <button onClick={() => setOpenNote(true)}>Noter</button>

            <Dialog 
                open={openNote} 
                onClose={() => setOpenNote(false)}
            >
                <DialogTitle className='PopupNoteTitre'>Votre note</DialogTitle>
                <DialogContent className='PopupNote'>
                    <Rating 
                        className="etoiles-rating"
                        name="etoiles-rating" 
                        value={noteValue} 
                        precision={1} 
                        sx={{ 
                            color: getCSSVariable('--greenLight'),
                            fontSize: "2.5em",
                        }}
                        onChange={(e, newValue) => {
                            setNoteValue(newValue);
                        }}
                    />
                </DialogContent> {/* Ouvre une nouvelle fenetre pour noter  */}
                <Button 
                    onClick={PostNote}
                    sx={{ color: getCSSVariable('--greenLight') }}
                >
                    Valider
                </Button>
            </Dialog>
        </>
    );
}

export { BoutonNotation };