import { ThemeContext } from "../../context/ThemeProvider";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";

export function LigneTheme({ UnTheme, PostThemeApi }) { 
    const [theme, setTheme, ListeThemes, setListeThemes] = useContext(ThemeContext);
    const [user] = useContext(UserContext);


    

    const handleThemeChange = () => {
        setTheme({
            id: UnTheme.id,  
            nom: UnTheme.nom, 
            class: UnTheme.class,
            logoCouleur: UnTheme.logoCouleur,
            user: UnTheme.user,
            couleurs: {
                grey: UnTheme.grey,
                deepBlue: UnTheme.deepBlue,
                white: UnTheme.white,
                greenLight: UnTheme.greenLight,
            }
        });
    };

    const [loading, setLoading] = useState(false);

    async function DeleteThemeApi(theme) {
    const url = 'http://localhost:8000/api/themes/' + theme.id;
    setLoading(true);
    
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        console.log('Thème supprimé avec succès');

        const newThemes = ListeThemes.filter(t => t.id !== UnTheme.id);

        if (UnTheme.active){
            PostThemeApi(ListeThemes[0], true, setLoading);
        }


        if (UnTheme.id == theme.id){
            setTheme({
                id: newThemes[0].id,  
                nom: newThemes[0].nom, 
                class: newThemes[0].class,
                logoCouleur: newThemes[0].logoCouleur,
                user: newThemes[0].user,
                couleurs: {
                    grey: newThemes[0].grey,
                    deepBlue: newThemes[0].deepBlue,
                    white: newThemes[0].white,
                    greenLight: newThemes[0].greenLight,
                }
            });
        }

        setListeThemes(newThemes);
        
    } catch (err) {
        console.error('Erreur lors de la suppression du thème:', err.message);
    } finally {
        setLoading(false);
    }
}

    return(
        <div className="formTestTheme-selection">
            <p>{UnTheme.nom}</p>
            <div className="formTestTheme-buttons">
                <button 
                    className={theme.id === UnTheme.id ? 'formTestTheme-apercu actif' : 'formTestTheme-apercu'}
                    onClick={handleThemeChange}
                >
                    {theme.id === UnTheme.id ? 'Actif' : 'Aperçu'}
                </button>
                {UnTheme.id !== 1 && (
                    <button className="formTestTheme-suppr"
                        onClick={() => DeleteThemeApi(UnTheme)}
                    >
                        {loading ? "Chargement..." : "Supprimer"}
                    </button>
                )}
            </div>
        </div>
    );
}