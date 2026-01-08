import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

function BoutonNotation() {
    const [openNote, setOpenNote] = useState(false);
    const [noteValue, setNoteValue] = useState(0);

    function PostNote() {
        console.log(`Note soumise : ${noteValue}`);

        
        setOpenNote(false);
    }

    return (
        <>
            <button onClick={() => setOpenNote(true)}>Noter</button>

            <Dialog 
                open={openNote} 
                onClose={() => setOpenNote(false)}
            >
                <DialogTitle
                    className='PopupNoteTitre'
                >Votre note</DialogTitle>
                <DialogContent
                    className='PopupNote'
                >
                    <Rating 
                    className="etoiles-rating"
                    name="etoiles-rating" 
                    value={noteValue} 
                    precision={1} 
                    sx={{ 
                      color: "#7AC74F",
                      fontSize: "2.5em",
                    }}
                    onChange={(e, newValue) => {
                        setNoteValue(newValue);
                    }}
                  />
                </DialogContent>
                <Button 
                    onClick={PostNote}
                    sx={{ 
                        color: "#7AC74F",
                    }}
                >Valider
                </Button>
            </Dialog>
        </>
    );
}

export { BoutonNotation };