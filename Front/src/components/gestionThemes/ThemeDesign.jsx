import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

export function ThemeDesign() {

    const [theme, setTheme, themes] = useContext(ThemeContext);

    return (
        <>
            <div>
                <p>Tester un thème : </p>
                <button
                        onClick={() => {
                            let idTheme = themes.findIndex(t => t.id === theme.id) + 1;
                            if (idTheme >= themes.length) {
                                idTheme = 0;
                            }
                            // console.log(idTheme);
                            const newTheme  = themes[idTheme];
                            setTheme(newTheme);
                        }}
                    >
                    Thème {theme.name}
                </button>
            </div>
            <div>
                <button>
                    Valider le thème
                </button>
            </div>
        </>
    );
}