import { Variables } from "./Variables";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserProvider";

function SourceDonnees({ article, setArticle, index }) {
    const [user] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [jeuDonnees, setJeuDonnees] = useState([]);
    const [variables, setVariables] = useState([]);
    const [selectedVariables, setSelectedVariables] = useState([]);

    // États contrôlés pour select / input
    const currentNom = article.sections[index].contenu.title || "";
    const [nomG, setNomG] = useState(currentNom);

    const currentjeuDonneeId = article.sections[index].contenu.jeuDonneeId || "";
    const [selectedJeuDonneesId, setSelectedJeuDonneesId] = useState(currentjeuDonneeId);

    const currentType = article.sections[index].contenu.type || "";
    const [selectedType, setSelectedType] = useState(currentType);

    // Récupération des jeux de données
    useEffect(() => {
        const fetchSourcesDonnees = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch('http://localhost:8000/api/jeu_donnees', {
                    method: 'GET',
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                const data = await response.json();
                if (!response.ok) {
                    setError(`Erreur: ${data.message}`);
                    return;
                }
                setJeuDonnees(data.member || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSourcesDonnees();
    }, [user.token]);

    // Fonction pour charger un jeu de données
    const loadJeuDonnees = async (donneesId, keepTitle = false, keepType = false) => {
        if (!donneesId) return;

        const dataset = jeuDonnees.find(jd => jd.id == donneesId);
        setSelectedData(dataset);

        setVariables([]);
        setSelectedVariables([]);

        // Sauvegarde du nom et type existants si demandé
        const existingTitle = keepTitle ? article.sections[index].contenu.title || "" : "";
        const existingType = keepType ? article.sections[index].contenu.type || "" : "";

        setLoading(true);
        setError('');

        // Reset contenu section en préservant title / type si nécessaire
        setArticle(prev => {
            const sections = [...prev.sections];
            sections[index] = {
                ...sections[index],
                contenu: {
                    type: existingType,
                    title: existingTitle,
                    labels: [],
                    datasets: [],
                    idDonnees: `/api/jeu_donnees/${donneesId}`,
                }
            };
            return { ...prev, sections };
        });

        // Met à jour l'état local du nom si on garde le titre
        setNomG(existingTitle);
        setSelectedType(existingType);

        try {
            const response = await fetch(`http://localhost:8000/api/jeu_donnee/${donneesId}/variables`, {
                method: 'GET',
                headers: { Authorization: `Bearer ${user.token}` },
            });
            const nomsVar = await response.json();
            if (!response.ok) throw new Error(nomsVar.message || "Erreur get variables");
            setVariables(nomsVar);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Initialisation si édition
    useEffect(() => {
        if (currentjeuDonneeId && jeuDonnees.length > 0) {
            loadJeuDonnees(currentjeuDonneeId, true, true); // garde le nom et le type existants
        }
    }, [currentjeuDonneeId, jeuDonnees]);

    // Gestion sélection variables
    const handleCheckVariables = (variable, checked) => {
        setSelectedVariables(prev => {
            if (checked) {
                const existing = prev.find(v => v.id === variable.id);
                return existing ? prev : [...prev, { ...variable, backgroundColor: "#000000" }];
            } else {
                return prev.filter(v => v.id !== variable.id);
            }
        });

        setArticle(prev => {
            const sections = [...prev.sections];
            const prevDatasets = sections[index].contenu.datasets || [];

            const newDatasets = checked
                ? [...prevDatasets, {
                    variableId: Number(variable.id),
                    label: variable.nom,
                    data: variable.valeurs,
                    backgroundColor: "#000000",
                    borderColor: "#000000"
                }]
                : prevDatasets.filter(ds => ds.variableId !== variable.id);

            let labels = sections[index].contenu.labels;
            if (prevDatasets.length === 0 && checked) {
                labels = variable.type === "categorielle"
                    ? variable.valeurs
                    : variable.valeurs.map((_, i) => `#${i + 1}`);
            }

            sections[index] = {
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    datasets: newDatasets,
                    labels
                }
            };
            return { ...prev, sections };
        });
    };

    // Gestion couleurs
    const handleColorChoice = (variableId, color) => {
        setArticle(prev => {
            const sections = [...prev.sections];
            sections[index].contenu.datasets =
                sections[index].contenu.datasets.map(nd =>
                    nd.variableId == variableId ? { ...nd, backgroundColor: color, borderColor: color } : nd
                );
            return { ...prev, sections };
        });
    };

    // Gestion type graphique
    const handleChoixTypeGraphique = (e) => {
        const typeGraphic = e.target.value;
        setSelectedType(typeGraphic);
        setArticle(prev => {
            const sections = [...prev.sections];
            sections[index] = {
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    type: typeGraphic
                }
            };
            return { ...prev, sections };
        });
    };

    // Gestion nom graphique
    const handleChangeNom = (e) => {
        const nomGraphic = e.target.value;
        setNomG(nomGraphic);
        setArticle(prev => {
            const sections = [...prev.sections];
            sections[index] = {
                ...sections[index],
                contenu: {
                    ...sections[index].contenu,
                    title: nomGraphic
                }
            };
            return { ...prev, sections };
        });
    };

    // Sélection d’un jeu de données
    const handleSourceDonnees = (e) => {
        const donneesId = e.target.value;
        setSelectedJeuDonneesId(donneesId);
        loadJeuDonnees(donneesId);
    };

    // Supprimer section
    const handleCrossClick = () => {
        const sections = article.sections.filter((_, i) => i !== index);
        setArticle({ ...article, sections });
    };

    return (
        <div className="zoneSourceDonnees">
            <label htmlFor="choixSourceDonnees">
                <h2>Source de données</h2>
                <img src="src\\assets\\croix.png" alt="fermer" className="cross icone" onClick={handleCrossClick} />
            </label>

            <select
                id="choixSourceDonnees"
                onChange={handleSourceDonnees}
                value={selectedJeuDonneesId}
                disabled={loading}
            >
                <option value="">{loading ? "Chargement..." : "Choisissez un jeu de données"}</option>
                {jeuDonnees.map(jd => (
                    <option key={jd.id} value={jd.id}>{jd.nom || 'nom jeu de données'}</option>
                ))}
            </select>

            {selectedData && (
                <div className="zoneCheck">
                    <h2>Variables</h2>
                    {variables.map(variable => (
                        <Variables
                            key={variable.id}
                            nom={variable.nom}
                            onCheck={checked => handleCheckVariables(variable, checked)}
                            onColorChange={color => handleColorChoice(variable.id, color)}
                        />
                    ))}
                </div>
            )}

            <label htmlFor="choixTypeGraphique"><h2>Type de graphique</h2></label>
            <select id="choixTypeGraphique" onChange={handleChoixTypeGraphique} value={selectedType}>
                <option value="">Choisissez le type de graphique</option>
                <option>bar chart</option>
                <option>line chart</option>
            </select>

            <label htmlFor="choixNomGraphique"><h2>Nom du graphique</h2></label>
            <input type="text" id="choixNomGraphique" value={nomG} onChange={handleChangeNom} required />

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export { SourceDonnees };
