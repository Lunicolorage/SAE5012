import { ThemeContext } from "../../context/ThemeProvider";
import { useContext } from "react";

export function LigneTheme({ UnTheme }) { 
    const [theme, setTheme, themes] = useContext(ThemeContext);

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

    return(
        <div className="formTestTheme-selection">
            <p className="formTestTheme-nom">{UnTheme.nom}</p>
            <div className="formTestTheme-buttons">
                <button 
                    className={theme.id === UnTheme.id ? 'formTestTheme-apercu actif' : 'formTestTheme-apercu'}
                    onClick={handleThemeChange}
                >
                    {theme.id === UnTheme.id ? 'Actif' : 'Aperçu'}
                </button>
                <button className="formTestTheme-suppr">
                    Supprimer
                </button>
            </div>
        </div>
    );
}