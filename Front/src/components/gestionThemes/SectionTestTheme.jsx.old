import { ThemeContext } from "../../context/ThemeProvider";
import { useContext } from "react";
import { BoutonValiderTheme } from "./BoutonValiderTheme";

export function SectionTestTheme() {

    const [theme, setTheme, themes] = useContext(ThemeContext);

    return (
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
    );
}
