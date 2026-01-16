import { ThemeContext } from "../../context/ThemeProvider";
import { UserContext } from "../../context/UserProvider";
import { useContext  } from "react";
import { BoutonValiderTheme } from "./BoutonValiderTheme";
import { LigneTheme } from "./LigneTheme";

export function SectionTestTheme() {

    const [theme, setTheme, themes] = useContext(ThemeContext);
    const [user] = useContext(UserContext);

    async function PostThemeApi(theme,isActive, setLoading) {
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

    // console.log(themes);

    return (
        <section className="formTestTheme">
                <h2>Thèmes disponibles </h2>
                <div>
                {themes.map((UnTheme, index)=>{
                    return <LigneTheme key={index} UnTheme={UnTheme} PostThemeApi={PostThemeApi}/>;
                })}
                </div>
                <BoutonValiderTheme PostThemeApi={PostThemeApi}/>
            </section>
    );
}
