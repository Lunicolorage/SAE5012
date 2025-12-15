import { useState } from "react";

function Donnees(){
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);

    function handleChange (e) {
        var file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {    
            let text = e.target.result;
            
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


    return(
        <div>
            <div className="importDonnees">
                <label htmlFor="csv" id="labelCsv">Source de données</label>
                <br></br>
                <input type="file" name="csv" id='csv' accept=".csv" onChange={handleChange} required ></input>
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
                            <select id={index}>
                                <option value="">-- Type de variable --</option>
                                <hr></hr>
                                <option value={"categorielle"}>Catégorielle</option>
                                <option value={"numerique"}>Numérique</option>
                            </select>
                        </div>
                    ))}
                    <button type="submit" className="publierButton">Publier</button>
                </form>
            </div>

        </div>
    )
}

export{Donnees};