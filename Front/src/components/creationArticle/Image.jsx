import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../context/UserProvider";

function Image({article, setArticle, index}){
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');
    const [user, setUser] = useContext(UserContext);

    // récupérer image en BDD pour remplir les options
    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            setError('');

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

                const response2 = await response.json();
                setImages(response2.member || []);
            }
            catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchImages();
    }, [user.token]);


    // image déjà en BDD
    function handleImageChange(e){
        const imageId = e.target.value;

        setArticle(prev =>{
            const sections = [...prev.sections];

            sections[index]={
                ...sections[index],
                type: "image",
                contenu: {
                    ...sections[index].contenu,
                    id: imageId,
                }
            }
            return {...prev, sections}
        })
    }

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://localhost:8000/api/media", { // route à rajouter en back
            method: "POST",
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
            body: formData,
        });

        return await response.json();
    };

    // nouvelle image
    async function handleAjoutImageChange(e){
        const file = e.target.files[0];
        if (file) { // à voir -> mettre image dans dossier pour images (pour être réutilisé) 
            // const imageUrl = URL.createObjectURL(file); // url temporaire

            try{
                const uploaded = await uploadImage(file);

                setArticle(prev=>{
                    const sections = [...prev.sections];

                    sections[index]={
                        ...sections[index],
                        type: "image",
                        contenu: {
                            ...sections[index].contenu,
                            // url: imageUrl,
                            id: uploaded.id,
                            url: uploaded.url,
                            // file: file, // permet de réutiliser l'image ? -> temporaire aussi
                        }
                    }
                    return {...prev, sections}
                })
            } catch (err) {
                setError(err.message);
            }
            

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
                <select id="choixImage" onChange={handleImageChange} disabled={loading}>
                    <option value="">{loading ? "Chargement..." : "Choisissez une image"}</option>

                    {/* Faire en sorte que si déjà en BDD -> se réengistre pas */}
                    {images.map((img) => (
                        <option key={img.id} value={img.id}>
                            {img.alt || "Image sans description"}
                        </option>
                    ))}

                </select>

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