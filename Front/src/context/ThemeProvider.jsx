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
    // console.log(theme);

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
    
    useEffect(() => {
        ListeThemes.forEach(monTheme => {
            if (monTheme.active){
                setTheme(monTheme);
            }
        });
    }, [ListeThemes]);

    useEffect(() => {
        document.documentElement.className = theme.class;
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={[theme,setTheme,ListeThemes]}
            >
            {children}
        </ThemeContext.Provider>
    )
}

export{ThemeProvider};