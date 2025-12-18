
function Texte({article, setArticle, index}){

    function handleTexteChange(e){

        setArticle(prev =>{
            const sections = [...prev.sections];

            sections[index] = {
                ...sections[index],
                type:"texte",
                contenu:{
                    contenu: e.target.value
                }
            }
            return {...prev, sections}
        })

        
        // const sections = article.sections.map((section, i)=>{
        //     if (i==index){
        //         return {
        //             ...section,
        //             type:"texte",
        //             contenu:{
        //                 contenu: e.target.value
        //             }
        //         }
        //     }
        //     return sections;
        // })
        

        // setArticle({
        //     ...article,
        //     sections:[ newSections
        //         // ...sectionsSansTexte,
        //         // {
        //         //     id: id,
        //         //     type:"texte",
        //         //     contenu:{
        //         //         contenu: e.target.value
        //         //     }
        //         // }
        //     ]
        // })
    }


    function handleCrossClick(){
        const indexToRemove = index;
        const sections = article.sections.filter((section, i)=> i!= indexToRemove)
        setArticle({...article, sections: sections})
    }

    return(
        <div className="zoneChoixTexte">
            {/* rajouter la croix dans le coin droit */}
            <label htmlFor="choixTexte">
                <h2>Texte</h2>
                <img src="/src/assets/croix.png" alt="fermer" className="cross" onClick={handleCrossClick}></img>
            </label>
            <textarea id="choixTexte" rows="4" onChange={handleTexteChange}></textarea>
        </div>
    )
}

export {Texte};