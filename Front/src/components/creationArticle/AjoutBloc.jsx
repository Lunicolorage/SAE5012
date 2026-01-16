import { useState } from "react";

function AjoutBloc({article, setArticle, clickCross}){
    const [type, setType] = useState('')

    // faire en sorte que ça gère sans avoir besoin de changer (ou modifier les selects)

    function handleChoixBloc(e){
        setType(e.target.value);        
    }

    function handleAjoutClick(){
        // ajouter bloc choisi dans la page
        switch (type){
            case "texte":
                setArticle({
                    ...article,
                    sections: [
                        ...article.sections,
                        {
                            type: "texte",
                            contenu: {
                                contenu: ""
                            }
                        }
                    ]
                });
                break;
            case "titre":
                setArticle({
                    ...article,
                    sections: [
                        ...article.sections,
                        {
                            type: "titre",
                            contenu: {
                                texte: "",
                                hierarchie: ""
                            }
                        }
                    ]
                })
                break;
            case "image":
                setArticle({
                    ...article,
                    sections: [
                        ...article.sections,
                        {
                            type: "image",
                            contenu: {
                                url: "",
                                alt: ""
                            }
                        }
                    ]
                })
            break;
            case "graphique":
                setArticle({
                    ...article,
                    sections: [
                        ...article.sections,
                        {
                            type: "graphique",
                            contenu: {
                                // à voir
                                type: "", // à voir -> "bar" | "pie" | "histogram"
                                title: "", //Titre du graphique
                                labels: [],
                                datasets: [], //intérieur différent en fonction du type de graphique
                                options: {},
                            }
                        }
                    ]
                })
        }
        console.log("ajout bloc");
    }


    return(
        <div className="zoneAjoutBloc">
            <div className="zoneTitreAjoutBloc">
                <h2>Quel bloc ajouter ?</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross" onClick={()=>clickCross(false)}></img>
            </div>
            <select name="choixBloc" id="choixBloc" onChange={handleChoixBloc}>
                {/* rajouter option neutre pour par défaut ? */}
                <option value="" >Choisissez un type de bloc</option>
                <option value="texte">Texte</option>
                <option value="titre">Sous-titre</option>
                <option value="image">Image</option>
                <option value="graphique">Graphique</option>
            </select>
            <button type="submit" onClick={handleAjoutClick}>Ajouter</button>
        </div>
    )
}

export {AjoutBloc}