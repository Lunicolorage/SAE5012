import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

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
                                // console.log(theme);
                                const newTheme  = themes[idTheme];
                                setTheme(newTheme);
                            }}
                        >
                        {theme.nom}
                    </button>
                </div>
                <button className="boutonValiderTheme">
                    Valider le thème
                </button>
            </section>
        </>
    );
}