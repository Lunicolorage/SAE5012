import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { UserContext } from "../../context/UserProvider";

function BoutonValiderTheme() {

    const [user] = useContext(UserContext);

    const [theme, setTheme, themes] = useContext(ThemeContext);
    themes.forEach(monTheme => {
        if (monTheme.active){
            let themeActive = monTheme;
        }
    });

    // console.log(theme);

    const [loading, setLoading] = useState(false);

    async function PostThemeApi(theme,isActive) {
        const url = 'http://localhost:8000/api/themes/'+theme.id;
        setLoading(true);
        
        const data = { "active": isActive };
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/merge-patch+json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            console.log('Thème modifié avec succès:');
            console.log(result);
            
        } catch (err) {
            console.error('Erreur lors de la modification du thème:', err.message);
        }finally {
            setLoading(false);
        }
    }

    return (
        <button className="boutonValiderTheme"
            onClick={() => {
                themes.forEach(monTheme => {
                    if (monTheme.id === theme.id){
                        PostThemeApi(monTheme,true);
                    } else {
                        PostThemeApi(monTheme,false);
                    }
                });
            }}
        >
            {loading ? "Chargement..." : "Valider le thème"}
        </button>
    );
}

export { BoutonValiderTheme };