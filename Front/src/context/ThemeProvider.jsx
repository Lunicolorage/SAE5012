import { useState, createContext,useEffect, use } from "react";
import ReactDOM from "react-dom/client";

export const ThemeContext = createContext();

// const themes = [
//     {id:1, nom: 'light', class: '' },
//     {id:2, nom: 'dark',class: 'dark-mode' },
//     {id:3, nom: 'blue', class: 'blue-mode' },
//   ];

function ThemeProvider({ children }) {

    const [ListeThemes, setListeThemes] = useState([]);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState({});
    // sconsole.log(theme);

    useEffect(() => {
        async function getData() {
        const url = 'http://localhost:8000/api/themes';
        try {
            const response = await fetch(url);
            if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            setListeThemes(result.member);
        } catch (err) {
            setError(err.message);
            console.error(err.message);
        }
        }
        getData();
    }, []); 
    // Récupère tous les thèmes
    
    useEffect(() => {
        ListeThemes.forEach(monTheme => {
            if (monTheme.active){
                setTheme({
                    id: monTheme.id, 
                    nom: monTheme.nom, 
                    class: monTheme.class,
                    logoCouleur: monTheme.logoCouleur,
                    user: monTheme.user,
                    couleurs: {
                        grey : monTheme.grey,
                        deepBlue : monTheme.deepBlue,
                        white : monTheme.white,
                        greenLight : monTheme.greenLight,
                    } } );
                // console.log(theme);
            }
        });
    }, [ListeThemes]);
    // Applique le thème séléctionné

    useEffect(() => {
        document.documentElement.className = theme.class;
        if (theme && theme.couleurs) {
            Object.entries(theme.couleurs).forEach(([key, value]) => {
                document.documentElement.style.setProperty(`--${key}`, value); //cette ligne modifie les variables CSS
            });
        }

    }, [theme]);

    //Modifie les variables css pour appliquer le thème

    return (
        <ThemeContext.Provider
            value={[theme,setTheme,ListeThemes, setListeThemes]}
            >
            {children}
        </ThemeContext.Provider>
    )
}

export{ThemeProvider};