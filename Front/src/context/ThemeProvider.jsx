import { useState, createContext,useEffect, use } from "react";
import ReactDOM from "react-dom/client";

export const ThemeContext = createContext();

const themes = [
    {id:1, name: 'light', class: '' },
    {id:2, name: 'dark',class: 'dark-mode' },
    {id:3, name: 'blue', class: 'blue-mode' },
  ];

function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(themes[0]);

    useEffect(() => {
        document.documentElement.className = theme.class;
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={[theme,setTheme,themes]}
            >
            {children}
        </ThemeContext.Provider>
    )
}

export{ThemeProvider};