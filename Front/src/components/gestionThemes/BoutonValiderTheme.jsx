import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

function BoutonValiderTheme({PostThemeApi}) {


    const [theme, setTheme, themes, setThemes] = useContext(ThemeContext);
    

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
                //modifie l'état de la State
                
                updatedThemes.forEach(monTheme => {
                    PostThemeApi(monTheme, monTheme.active, setLoading);
                });
                //Modifie l'état dans la bdd
            }}
        >
            {loading ? "Chargement..." : "Valider le thème"}
        </button>
    );
}

export { BoutonValiderTheme };