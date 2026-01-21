import { useState, useContext } from "react";

export function BoutonModif({setOnModifier, OnModifier}){

    return(
        <button 
            onClick={()=> setOnModifier(!OnModifier)}
            className="articleSolo-modif">
            Modifier
        </button>
    )
}
