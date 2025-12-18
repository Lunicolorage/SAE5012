
function AjoutBloc({article, setArticle}){

    function handleChoixBloc(e){
        switch (e.target.value){
            case "texte":
                setArticle({
                    ...article,
                    sections: [
                        ...article.sections,
                        {
                            id: 'id', // à changer
                            type: "texte",
                            contenu: {
                                contenu: ""
                            }
                        }
                    ]
                });
                break;
        }
    }

    function handleAjoutClick(){
        // ajouter bloc dans la page
        console.log("ajout bloc");
    }

    return(
        <div className="zoneAjoutBloc">
            <div className="zoneTitreAjoutBloc">
                <h2>Quel bloc ajouter ?</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross"></img>
            </div>
            <select name="choixBloc" id="choixBloc" onChange={handleChoixBloc}>
                <option value="texte">Texte</option>
                <option value="sousTitre">Sous-titre</option>
                <option value="img">Image</option>
                <option value="graphique">Graphique</option>
            </select>
            <button type="submit" onClick={handleAjoutClick}>Ajouter</button>
        </div>
    )
}

export {AjoutBloc}