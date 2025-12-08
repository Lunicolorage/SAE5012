
function Donnees(){
    function previewXLSFile (e) {
        var file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function(e) {    
            let data = e.target.result;
            console.log(data);
        }
        reader.readAsArrayBuffer(file);
    }
    var inputFile = document.getElementById("csv");
    inputFile.addEventListener("change", previewXLSFile, false);

    return(
        <div>
            <label for="csv" id="labelCsv">Source de données</label>
            <input type="file" name="csv" id='csv' accept=".xls, .xlsx, .csv" required ></input>
        </div>
    )
}

export{Donnees};