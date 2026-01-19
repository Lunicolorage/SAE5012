import { InputColorTheme } from "./InputColorTheme";
import { ThemeContext } from "../../context/ThemeProvider";
import { UserContext } from "../../context/UserProvider";
import { useContext, useEffect, useState } from "react";

export function SectionCreateTheme() {

    const [theme, setTheme, themes, setThemes] = useContext(ThemeContext);
    const [user] = useContext(UserContext);
    // console.log(user.id);
 
    const [nomTheme, setNomTheme] = useState('');
    const [logoColor, setLogoColor] = useState(theme.logoCouleur);
    const [loading, setLoading] = useState(false);

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
    //modification des élément du formulaire pour avoir un aperçu

    //Création d'un nouveau thème
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const newTheme = {
            nom: nomTheme,
            class: nomTheme.toLowerCase().replace(/\s+/g, '-'),
            user: 'api/users/'+user.id,
            active: false,
            logo_couleur: logoColor,
            grey: couleurSecondaire,
            deepBlue: couleurTexte,
            white: couleurPrincipale,
            greenLight: couleurAccent,
        };

        const url = 'http://localhost:8000/api/themes';
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/ld+json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify(newTheme)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Thème créé avec succès :', data);
            // Ajouter le nouveau thème à la liste
            setThemes([...themes, data]);
            // Réinitialiser le formulaire
            setNomTheme('');
            setCouleurAccent(theme.couleurs.greenLight);
            setCouleurPrincipale(theme.couleurs.white);
            setCouleurSecondaire(theme.couleurs.grey);
            setCouleurTexte(theme.couleurs.deepBlue);
        }) 
        .catch(error => {
            console.error('Erreur lors de la création du thème:', error);
        })
        .finally(() => {
            setLoading(false);
        });
    }

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
            <button type="submit" disabled={loading}>
                {loading ? "Création en cours..." : "Créer le thème"}
            </button>
            
        </form>
    );
}