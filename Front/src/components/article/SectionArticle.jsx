import React from "react";

function SectionArticle(section){
    // console.log(section);

    if(section.section.type == 'titre'){
        return(
            <>
             {React.createElement(
                section.section.contenu.hierarchie,
                { className: 'sectionTitre' },
                section.section.contenu.texte,
            )}
            </>
        )
    }

    if(section.section.type == 'texte'){
        return(
            <p className="sectionTexte">{section.section.contenu.contenu}</p>
        )
    }

    if(section.section.type == 'image'){
        // console.log(section.section.contenu[0].alt);
        return(
            <img className="sectionImage" src={section.section.contenu[0].url} alt={section.section.contenu[0].alt} />
        )
    }

    if(section.section.type == 'graph'){
        return(
           <p>graphique</p>
        )
    }

}

export {SectionArticle}