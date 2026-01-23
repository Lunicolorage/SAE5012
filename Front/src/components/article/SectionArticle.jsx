import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto";

function SectionArticle({section, couleur}){
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
        
        const datasetsWithColors = section.contenu.datasets.map((dataset) => {
            // On cherche dans le tableau "variables" celui qui correspond à ce dataset
            const variableInfo = section.contenu.variables?.find(
                v => v.variableId === dataset.variableId
            );
            // récupère les couleurs
            const savedColors = variableInfo?.couleur;
            
            // Si des couleurs sont sauvegardées dans GraphiqueVariable, les utiliser
            // Sinon, garder celles du dataset (noir par défaut)
            return {
                ...dataset,
                backgroundColor: savedColors || dataset.backgroundColor,
                borderColor: savedColors || dataset.borderColor,
            };
        });

        const data = {
            labels: section.contenu.labels,
            datasets: datasetsWithColors,  // tableau avec les bonnes couleurs
        }
        
        const options = {
            responsive: true,
            maintainAspectRatio: false, // pour éviter pbm taille pie chart
            plugins: {
                title: {
                    display: true,
                    text: section.contenu.title,
                    font: {
                        size: 15
                    },
                    color: couleur("--deepBlue"),
                },
                legend: {
                    labels:{
                        color: couleur("--deepBlue"),
                    }
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: couleur("--deepBlue"),
                    },
                    grid: {
                        color: couleur("--grey"),
                    },
                    border: {
                        color: couleur("--deepBlue"),
                    }
                },
                y: {
                    ticks: {
                        color: couleur("--deepBlue"),
                    },
                    grid: {
                        color: couleur("--grey"),
                    },
                    border: {
                        color: couleur("--deepBlue"),
                    }
                }
            }
        }

        const graphique = () => {
            switch (section.contenu.type){
                case "pie chart":
                    return <Pie key={section.id} data={data} options={options}/>;
                case "bar chart":
                    return <Bar data={data} options={options}/>;
                case "line chart":
                    return <Line data={data} options={options}/>;
                default:
                    return <p>Type de graphique non supporté</p>;
            }
        }
        

        return(
            <div className={`sectionGraphique ${section.contenu.type === "pie chart" ? "sectionGraphiquePie" : ""}`}>
                 {/* faire en fonction de celui choisi */}
                {graphique()}
            </div>
        )
    }

}

export {SectionArticle}