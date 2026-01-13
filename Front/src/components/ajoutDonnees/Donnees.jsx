import { useState } from "react";

function Donnees(){
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [variables, setVariables] = useState([]); // utiliser ? tab obj

    function handleChoixFichier (e) {
        var file = e.target.files[0];
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
        reader.readAsText(file);
    }


    function handleChangeTypeVar(e){
        // associer le bon type à la bonne variable -> obj
        // setVariables(prev=>{...prev, e.target.value}) // à voir
    }

    // doit enregistrer dans jeu_donnee le lien du fichier (url cf image ?), l'id du user, created_at ?
    // doit enregistrer dans variable pour chaque variable le nom, le type, id du jeu de données lié
    async function handleClickPublier(){
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
                <form action="" className="choixTypeVar">
                    {headers.map((header, index) => (
                        // à voir pour la div
                        <div key={index} className="typeVar"> 
                            <label htmlFor={index}>{header}</label>
                            <select id={index} onChange={handleChangeTypeVar}>
                                <option value="">-- Type de variable --</option>
                                <hr></hr>
                                <option value={"categorielle"}>Catégorielle</option>
                                <option value={"numerique"}>Numérique</option>
                            </select>
                        </div>
                    ))}
                    <button type="submit" className="publierButton" onClick={handleClickPublier}>Publier</button>
                </form>
            </div>

        </div>
    )
}

export{Donnees};