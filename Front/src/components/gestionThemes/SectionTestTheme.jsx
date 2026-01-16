import { ThemeContext } from "../../context/ThemeProvider";
import { useContext } from "react";
import { BoutonValiderTheme } from "./BoutonValiderTheme";
import { LigneTheme } from "./LigneTheme";

export function SectionTestTheme() {

    const [theme, setTheme, themes] = useContext(ThemeContext);

    // console.log(themes);

    return (
        <section className="formTestTheme">
                <h2>Thèmes disponibles </h2>
                <div>
                {themes.map((UnTheme, index)=>{
                    return <LigneTheme key={index} UnTheme={UnTheme}/>;
                })}
                </div>
                <BoutonValiderTheme />
            </section>
    );
}
