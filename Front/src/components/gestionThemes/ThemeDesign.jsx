import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { BoutonValiderTheme } from "./BoutonValiderTheme";

export function ThemeDesign() {

    const [theme, setTheme, themes] = useContext(ThemeContext);

    return (
        <>  
            <h1>Design du thème</h1>
            <section className="formTestTheme">
                <div className="formTestTheme-selection">
                    <h2>Thème actif : </h2>
                    <button
                            className="boutonTestTheme"
                            onClick={() => {
                                let idTheme = themes.findIndex(t => t.id === theme.id) + 1;
                                if (idTheme >= themes.length) {
                                    idTheme = 0;
                                }
                                
                                const newTheme  = themes[idTheme];
                                setTheme({
                                id: newTheme.id, 
                                nom: newTheme.nom, 
                                class: newTheme.class,
                                logoCouleur: newTheme.logoCouleur,
                                user: newTheme.user,
                                couleurs: {
                                    grey : newTheme.grey,
                                    deepBlue : newTheme.deepBlue,
                                    white : newTheme.white,
                                    greenLight : newTheme.greenLight,
                                } } );
                                // console.log(theme);
                            }}
                        >
                        {theme.nom}
                    </button>
                </div>
                <BoutonValiderTheme />
            </section>
        </>
    );
}