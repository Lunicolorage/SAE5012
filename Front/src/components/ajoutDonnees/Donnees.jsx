import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

function Donnees(){
    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [variables, setVariables] = useState({}); // utiliser ? tab, obj ?

    const [fileName, setFileName] = useState(''); // à voir -> correspond pas au lien
    const [file, setFile] = useState(null) // -> pour vrai fichier (test)

    function handleChoixFichier (e) {
        var selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // setFileName(selectedFile.name);
        setFile(selectedFile);

        let reader = new FileReader();
        reader.onload = function(e) {    
            let text = e.target.result;
            
            // trim supprime les espaces au début et à la fin d'une chaîne
            const lines = text.split("\n").map(line => line.trim()).filter(line => line !== "");

            const newHeaders = lines[0].split(",");
            setHeaders(newHeaders);

            const rows = lines.slice(1).map(line => {
                const values = line.split(",");
                let obj = {};
                newHeaders.forEach((h, i) => {
                    obj[h] = values[i];
                });
                return obj;
            });

            console.log("tab :", rows);
            setData(rows);
        }
        reader.readAsText(selectedFile);
    }


    function handleChangeTypeVar(nomVar, type){
        // associer le bon type à la bonne variable -> obj
        setVariables(prev=>({...prev, [nomVar]: type}));
    }

    // doit enregistrer dans jeu_donnee le lien du fichier (url cf image ?), l'id du user, created_at ?
    // doit enregistrer dans variable pour chaque variable le nom, le type, id du jeu de données lié
    async function handleClickPublier(e){
        // appel à /api/jeu_donnees en POST
        // {
        //     "createdAt": "2026-01-13T10:14:33.989Z",
        //     "user": "https://example.com/",
        //     "lien": "string",
        //     "variables": [
        //         "https://example.com/"
        //     ],
        //     "graphiques": [
        //         "https://example.com/"
        //     ]
        // }
        // appel à /api/variables en POST
        // {
        //     "idDonnees": "https://example.com/",
        //     "nom": "string",
        //     "type": "string",
        //     "graphiqueVariables": [
        //         "https://example.com/"
        //     ]
        // }
        // Doit pas remplir graphiques et graphiqueVariables pour l'instant. 
        // Verif peut être null

        e.preventDefault();
        setLoading(true);
        setError('');

        if (headers.length == 0){ // vérif si fichier choisi
            setError("Choisir un fichier");
            setLoading(false);
            return;
        }

        if (Object.keys(variables).length != headers.length){ // vérif si toutes les variables ont un type
            setError("Choisir un type pour chaque variable");
            setLoading(false);
            return;
        }

        try{
            const response = await fetch("http://localhost:8000/api/jeu_donnees", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    user: `/api/users/${user.id}`,
                    lien: fileName,
                    // createdAt -> voir dans back
                })
            })

            const uploaded = await response.json();

            if(!response.ok){
                throw new Error(uploaded.message || "Erreur envoi données");
            }


            // Variables
            for (const [nom, type] of Object.entries(variables)){ // pour chaque variable
                const response2 = await fetch("http://localhost:8000/api/variables", {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`
                    },
                    body: JSON.stringify({
                        idDonnees: uploaded['@id'], // à voir -> nom pas sûr
                        nom,
                        type
                    })
                })

                if (!response2.ok){
                    throw new Error("Erreur envoi variables");
                }
            }

            console.log("jeu de données (et variables) ok")

        } catch (err) {
            setError(err.message);            
        } finally{
            setLoading(false);
        }
        
    }


    return(
        <div>
            <div className="importDonnees">
                <label htmlFor="csv" id="labelCsv">Source de données</label>
                <br></br>
                <input type="file" name="csv" id='csv' accept=".csv" onChange={handleChoixFichier} required ></input>
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
                        {data.map((row, index) => (
                            <tr key={index}>
                            {headers.map((header, idx) => (
                                <td key={idx}>{row[header]}</td>
                            ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
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

                    <button type="submit" className="publierButton" disabled={loading} onClick={handleClickPublier}>{loading ? "Publication..." : "Publier"}</button>
                </form>
            </div>
        </div>
    )
}

export{Donnees};