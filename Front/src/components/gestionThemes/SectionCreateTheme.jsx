import { InputColorTheme } from "./InputColorTheme";
import { ThemeContext } from "../../context/ThemeProvider";
import { useContext } from "react";

export function SectionCreateTheme() {

    const [theme, setTheme, themes] = useContext(ThemeContext);
    // console.log(theme.couleurs);

    return (
        <section className="formCreateTheme">
            <h2>Création d'un thème</h2>
            <div>
                <h3>Nom du thème</h3>
                <input type="text" placeholder="monTheme"/>
            </div>
                <InputColorTheme
                    label='Couleur principale'
                    colorValue={theme.couleurs?.white}
                />
                <InputColorTheme
                    label='Couleur secondaire'
                    colorValue={theme.couleurs?.grey}
                />
                <InputColorTheme
                    label="Couleur d'accent"
                    colorValue={theme.couleurs?.greenLight}
                />
                <InputColorTheme
                    label='Couleur de texte'
                    colorValue={theme.couleurs?.deepBlue}
                />
            <div>
                <h3>Couleurs du logo</h3>
                <input type="text" placeholder="clair"/>
            </div>
            <button>
                Créer le thème
            </button>
        </section>
    );
}