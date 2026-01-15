import { InputColorTheme } from "./InputColorTheme";
import { ThemeContext } from "../../context/ThemeProvider";
import { useContext, useEffect, useState } from "react";

export function SectionCreateTheme() {

    const [theme, setTheme, themes] = useContext(ThemeContext);
    // console.log(theme);
 
    const [nomTheme, setNomTheme] = useState('');
    const [logoColor, setLogoColor] = useState(theme.logoCouleur);

    const [couleurPrincipale, setCouleurPrincipale] = useState(theme.couleurs.white);
    const [couleurSecondaire, setCouleurSecondaire] = useState(theme.couleurs.grey);
    const [couleurAccent, setCouleurAccent] = useState(theme.couleurs.greenLight);
    const [couleurTexte, setCouleurTexte] = useState(theme.couleurs.deepBlue);

    useEffect(() => {
        setTheme({
            ...theme,
            logoCouleur: logoColor,
            couleurs: {
                grey : couleurSecondaire,
                deepBlue : couleurTexte,
                white : couleurPrincipale,
                greenLight : couleurAccent,
        } } );
        // console.log(theme);
    }, [couleurPrincipale, couleurSecondaire, couleurAccent, couleurTexte, logoColor]);

    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche la redirection
        // Ici vous pouvez ajouter votre logique pour traiter le formulaire
        console.log('Thème créé :', { nomTheme, logoColor, couleurPrincipale, couleurSecondaire, couleurAccent, couleurTexte });
    };

    return (
        <form className="formCreateTheme" onSubmit={handleSubmit}>
            <h2>Création d'un thème</h2>
            <div>
                <h3>Nom du thème</h3>
                <input type="text" placeholder="monTheme" required pattern="[a-zA-Z0-9]+"
                    value={nomTheme}
                    onChange={(e) => setNomTheme(e.target.value)}
                />
            </div>
            <div className="allInputColor">
                <InputColorTheme
                    label='Couleur principale'
                    colorValue={couleurPrincipale}
                    setColorValue={setCouleurPrincipale}
                    
                />
                <InputColorTheme
                    label='Couleur secondaire'
                    colorValue={couleurSecondaire}
                    setColorValue={setCouleurSecondaire}
                />
                <InputColorTheme
                    label="Couleur d'accent"
                    colorValue={couleurAccent}
                    setColorValue={setCouleurAccent}
                />
                <InputColorTheme
                    label='Couleur de texte'
                    colorValue={couleurTexte}
                    setColorValue={setCouleurTexte}
                />
            </div>
            <div>
                <h3>Couleurs du logo</h3>
                <select name="logoColor" id="logoColor-select"
                    value={logoColor}
                    onChange={(e) => setLogoColor(e.target.value)}
                >
                    <option value="fonce">logo foncé</option>
                    <option value="clair">logo clair</option>
                </select>       
            </div>
            <button type="submit">
                Créer le thème
            </button>
            
        </form>
    );
}