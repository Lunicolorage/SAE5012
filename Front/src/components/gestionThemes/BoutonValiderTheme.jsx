import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

function BoutonValiderTheme({PostThemeApi}) {


    const [theme, setTheme, themes, setThemes] = useContext(ThemeContext);
    themes.forEach(monTheme => {
        if (monTheme.active){
            let themeActive = monTheme;
        }
    });

    // console.log(theme);
    const [loading, setLoading] = useState(false);

    

    return (
        <button className="boutonValiderTheme"
            onClick={() => {
                const updatedThemes = themes.map(monTheme => ({
                    ...monTheme,
                    active: monTheme.id === theme.id
                }));
                setThemes(updatedThemes);
                
                updatedThemes.forEach(monTheme => {
                    PostThemeApi(monTheme, monTheme.active, setLoading);
                });
            }}
        >
            {loading ? "Chargement..." : "Valider le thème"}
        </button>
    );
}

export { BoutonValiderTheme };