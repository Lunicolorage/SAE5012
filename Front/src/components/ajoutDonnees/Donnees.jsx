import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

function Donnees(){
    const [user] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [variables, setVariables] = useState({});
    const [file, setFile] = useState(null);
    const [visibleRows, setVisibleRows] = useState(10);
    // const [showScrollBtnBas, setShowScrollBtnBas] = useState(false);
    

    function handleChoixFichier (e) {
        var selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);

        let reader = new FileReader();

        function detectSeparator(line){
            // tester première ligne pour voir si plus de , ou de ; -> en déduire séparateur pour le reste
            const nbVirgule = (line.match(/,/g) || []).length;
            const nbPointVirgule = (line.match(/;/g) || []).length;

            return nbPointVirgule > nbVirgule ? ";" : ",";
        }

        reader.onload = (e) => {
            try{
                const text = e.target.result;

                const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);

                if (lines.length == 0) return;

                const separateur = detectSeparator(lines[0]);

                // headers -> nom des colonnes
                const headers = lines[0].split(separateur).map(h => h.trim());
                setHeaders(headers);

                // données
                const rows = lines.slice(1).map(line => {
                    const values = line.split(separateur).map(v => v.trim());

                    return headers.reduce((obj, header, index) => {
                        let value = values[index] ?? "";
                        value = value.replace(/"/g, ''); // Enlever les guillemets
                        obj[header] = value;
                        return obj;
                    }, {});
                });
                setData(rows);

                console.log("séparateur : ", separateur);
                console.log("données :", rows);

            } catch (error) {
                console.error("Erreur fichier CSV : ", error);
            }
        }

        reader.onerror = () => {
            console.error("Impossible de le lire le fichier");
        };
        
        reader.readAsText(selectedFile);
    }


    function handleChangeTypeVar(nomVar, type){
        // associer le bon type à la bonne variable -> obj
        setVariables(prev=>({...prev, [nomVar]: type}));
    }

    // doit enregistrer dans jeu_donnee le lien du fichier, l'id du user, nom fichier
    // doit enregistrer dans variable pour chaque variable le nom, le type, id du jeu de données lié
    async function handleClickPublier(e){
        e.preventDefault();
        setLoading(true);
        setError('');

        // vérif si fichier choisi
        if (headers.length == 0){ 
            setError("Choisir un fichier");
            setLoading(false);
            return;
        }

        // vérif si toutes les variables ont un type
        if (Object.keys(variables).length != headers.length){ 
            setError("Choisir un type pour chaque variable");
            setLoading(false);
            return;
        }

        try{
            // console.log(`/api/users/${user.id}`); // ok
            // console.log(file); // ok
            const userId = user.id; 

            // https://fr.javascript.info/formdata 
            const formData = new FormData();
            formData.append("user", userId);
            // formData.append("user", `/api/users/${userId}`);
            formData.append("lien", file);
            formData.append("nom", file.name);
                        
            // for (var value of formData.values()) {
            //     console.log(value); // ok
            // }

            const response = await fetch("http://localhost:8000/api/datasets", {
                method: "POST",
                headers: { 
                    Authorization: `Bearer ${user.token}`
                },
                body: formData,
            })

            const uploaded = await response.json();

            if(!response.ok){
                throw new Error(uploaded.message || "Erreur envoi données");
            }


            // Variables
            for (const [nom, type] of Object.entries(variables)){ // récupère nom et type pour chaque variable dans variables

                const valeursCol = data.map(row => {
                    let val = row[nom];

                    if (type == "numerique") {
                        val = val.toString().trim().replace(/,/g, '.'); // Remplacer virgule par point
                        const numVal = Number(val);
                        return numVal;

                        // if (isNaN(numVal)) {
                        //     console.warn(`Valeur non numérique détectée: "${val}" pour la colonne "${nom}"`);
                        //     return null; 
                        // }
                        // return numVal;
                    }
                    return val;
                })

                const response2 = await fetch("http://localhost:8000/api/variables", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/ld+json', // ld = Linked Data -> nécessaire pour façon dont gère id
                        Authorization: `Bearer ${user.token}`
                    },
                    body: JSON.stringify({
                        idDonnees: `/api/jeu_donnees/${uploaded.id}`,
                        nom,
                        type,
                        valeurs: valeursCol,
                        // graphiqueVariables: [], // à changer ? -> là juste pour tester
                    })
                })

                if (!response2.ok){
                    const errorData = await response2.json();
                    console.log(errorData);
                    throw new Error("Erreur envoi variables");
                }
                else {
                    setSuccess('Données ajoutées en base de données');
                }
            }

            // console.log("jeu de données (et variables) ok")

        } catch (err) {
            setError(err.message);            
        } finally{
            setLoading(false);
        }
        
    }


    // useEffect(() => {
    //     function handleScroll(){
    //         setShowScrollBtnBas(window.scrollY > 300);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return ()=> {window.removeEventListener('scroll', handleScroll);}
    // }, [])

    function scrollToBottom(){
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
        })
    }


    return(
        <div className="pageImportDonnees">
            <h1>Ajouter des données</h1>

            <div className="importDonnees">
                <label htmlFor="csv" id="labelCsv">Source de données</label>
                <br/>
                <input type="file" name="csv" id='csv' accept=".csv" onChange={handleChoixFichier} required ></input>
            </div>

            <div className="buttonsTabHaut">                    
                    {visibleRows > 10 && (
                        <button onClick={() => setVisibleRows(10)}>Réduire</button>
                    )}

                {visibleRows > 10 && (
                    <button className="scrollBottomButton" onClick={scrollToBottom}>
                        ↓
                    </button>
                )}
            </div>

            <div className="tableContainer">
                <table border="1" cellPadding="5" cellSpacing="0">
                    <thead>
                        <tr>
                            {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.slice(0, visibleRows).map((row, index) => (
                            <tr key={index}>
                            {headers.map((header, idx) => (
                                <td key={idx}>{row[header]}</td>
                            ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                
            </div>

            <div className="buttonsTab">
                    {data.length > visibleRows && (
                        <button onClick={() => setVisibleRows(prev => prev + 10)}>Afficher plus</button>
                    )}
                    
                    {visibleRows > 10 && (
                        <button onClick={() => setVisibleRows(10)}>Réduire</button>
                    )}

                    {data.length > visibleRows && (
                        <button onClick={() => setVisibleRows(data.length)}>Tout afficher</button>
                    )}
            </div>

            <div className="variables">
                <h2>Variables</h2>
                <form className="choixTypeVar">
                    {headers.map((header, index) => (
                        // à voir pour la div
                        <div key={index} className="typeVar"> 
                            <label htmlFor={index}>{header}</label>
                            <select id={index} onChange={(e)=>handleChangeTypeVar(header, e.target.value)}>
                                <option value="">-- Type de variable --</option>
                                <hr></hr> {/* à voir */}
                                <option value={"categorielle"}>Catégorielle</option>
                                <option value={"numerique"}>Numérique</option>
                            </select>
                        </div>
                    ))}

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}

                    <button type="submit" className="publierButton" disabled={loading} onClick={handleClickPublier}>{loading ? "Publication..." : "Publier"}</button>
                </form>
            </div>
        </div>
    )
}

export{Donnees};