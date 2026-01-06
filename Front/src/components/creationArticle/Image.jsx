import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";

function Image({article, setArticle, index}){
    const [options, setOptions] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
    const [user, setUser] = useContext(UserContext);

    function handleImageChange(e){
        const imageUrl = e.target.value;

        setArticle(prev =>{
            const sections = [...prev.sections];

            sections[index]={
                ...sections[index],
                type: "image",
                contenu: {
                    ...sections[index].contenu,
                    url: imageUrl,
                }
            }
            return {...prev, sections}
        })
    }

    function handleAjoutImageChange(e){
        const file = e.target.files[0];
        if (file) { // à voir -> mettre image dans dossier pour images (pour être réutilisé) 
            const imageUrl = URL.createObjectURL(file); // et récupérer cet url

            setArticle(prev=>{
                const sections = [...prev.sections];

                sections[index]={
                    ...sections[index],
                    type: "image",
                    contenu: {
                        ...sections[index].contenu,
                        url: imageUrl,
                    }
                }
                return {...prev, sections}
            })

        }
    }

    function handleAltChange(e){
        const imageAlt = e.target.value;

        setArticle(prev =>{
            const sections = [...prev.sections];

            sections[index]={
                ...sections[index],
                type: "image",
                contenu: {
                    ...sections[index].contenu,
                    alt: imageAlt,
                }
            }
            return {...prev, sections}
        })
    }


    const handleSelectClick = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/images', {
                method: 'GET',
                headers: { 
                    Authorization: `Bearer ${user.token}`
                },
            });
        
            if (!response.ok) {
                const errorData = await response.json();
                setError(`Erreur: ${errorData.message}`);
            }
            else{
                // à voir
                const allImages = await response.json();

                console.log(allImages);

                setOptions(
                    allImages.map((img) => {
                        console.log('map') // ne s'affiche pas
                        const altImage = img.alt;
                        const urlImage = img.url;
                        return <option key={urlImage} value={urlImage}>{altImage}</option>;  
                    })
                );

            }
           
        } catch (err) {
            setError(` Erreur : ${err.message}`);
        } finally {
            setLoading(false);
        }

    }




    function handleCrossClick(){
        const indexToRemove = index;
        const sections = article.sections.filter((section, i)=> i!= indexToRemove)
        setArticle({...article, sections: sections})
    }



    return(
        <div className="zoneChoixImage">
            <label htmlFor="choixImage">
                <h2>Image</h2>
                <img src="src\assets\croix.png" alt="fermer" className="cross" onClick={handleCrossClick}></img>
            </label>

            <div className="selectionImage">
                <select id="choixImage" onChange={handleImageChange} onClick={handleSelectClick}>
                    <option value="">Choisissez une image</option>
                    {/* à obtenir dynamiquement avec bdd ? */}
                    {options}
                    <option value="url">image stockée 1</option>
                    <option value="url">image stockée 2</option>
                    <option value="url">image stockée 3</option>
                </select>

                {/* <button className="ajoutImage">Ajouter une image</button> */}
                <input type="file" id="ajoutImage" name="ajoutImage" accept=".jpg, .png, .webp" onChange={handleAjoutImageChange}/>
            </div>

            <div className="choixAlt">
                <label htmlFor="alt">Choisir un texte alternatif</label>
                <input type="text" id="alt" onChange={handleAltChange}/>
            </div>
                
        </div>
    )
}

export {Image};