import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";

function SectionArticle({section}){
    // console.log(section);

    if(section.type == 'titre'){
        return(
            <>
             {React.createElement(
                section.contenu.hierarchie,
                { className: 'sectionTitre' },
                section.contenu.texte,
            )}
            </>
        )
    }

    if(section.type == 'texte'){
        return(
            <p className="sectionTexte">{section.contenu.contenu}</p>
        )
    }

    if(section.type == 'image'){
        // console.log(section.contenu[0].alt);
        return(
            <img className="sectionImage" src={section.contenu[0].url} alt={section.contenu[0].alt} />
        )
    }

    if(section.type == 'graphique'){
        
        const data = {
            labels: section.contenu.labels,
            datasets: section.contenu.datasets,
        } // ce qui est dans contenu -> labels + datasets

        const options = {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: section.contenu.title,
                    font: {
                        size: 15
                    }
                }
            }
        }

        const graphique = () => {
            switch (section.contenu.type){
                case "pie chart":
                    return <Pie data={data} options={options}/>;
                case "bar chart":
                    return <Bar data={data} options={options}/>;
                case "line chart":
                    return <Line data={data} options={options}/>;
                default:
                    return <p>Type de graphique non supporté</p>;
            }
        }
        

        return(
            <div className="sectionGraphique">
                 {/* faire en fonction de celui choisi */}
                {graphique()}
            </div>

            // <div className="sectionGraphique">
            //     <canvas id="chart">{graphique()}</canvas>
            // </div>

        )
    }

}

export {SectionArticle}