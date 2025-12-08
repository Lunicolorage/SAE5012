import { useState } from "react";

function Donnees(){
    const [data, setData] = useState([]);


    function previewXLSFile (e) {
        var file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {    
            let text = e.target.result;
            
            const lines = text.split("\n").map(l => l.trim()).filter(l => l !== "");

            const headers = lines[0].split(",");
            console.log(headers); // à voir

            const json = lines.slice(1).map(line => {
                const values = line.split(",");
                let obj = {};
                headers.forEach((h, i) => {
                    obj[h] = values[i];
                });
                return obj;
            });

            console.log("JSON :", json); // à voir --> plutôt 1 tab js ?
            setData(json);
        }
        reader.readAsText(file);
    }


    function handleChange(e){
        previewXLSFile(e);

        // console.log(headers);
    }

    return(
        <div>
            <label htmlFor="csv" id="labelCsv">Source de données</label>
            <input type="file" name="csv" id='csv' accept=".csv" onChange={handleChange} required ></input>
        
            <table>

            </table>
        </div>
    )
}

export{Donnees};