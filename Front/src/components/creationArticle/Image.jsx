import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../../context/UserProvider";

function Image({article, setArticle, index}){
    const [images, setImages] = useState([]);
    const [altValue, setAltValue] = useState('');
    const [tempImage, setTempImage] = useState(null);
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
            
                const response2 = await response.json();

                if (!response.ok) {
                    setError(`Erreur: ${response2.message}`);
                    return;
                }

                
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

        const selectedImage = images.find(img => img.id == imageId);
        setAltValue(selectedImage.alt || '');

        setArticle(prev =>{
            const sections = [...prev.sections];

            sections[index]={
                ...sections[index],
                type: "image",
                contenu: {
                    ...sections[index].contenu,
                    id: imageId,
                    url: selectedImage.url,
                    alt: selectedImage.alt,
                }
            }
            return {...prev, sections}
        })
    }

    
    // enregistrer la nouvelle image
    // const uploadImage = async (file) => {
    //     const formData = new FormData();

    //     console.log(file);

    //     formData.append("file", file);
    //     formData.append("alt", altValue || file.name);

    //     console.log(formData);

    //     const response = await fetch("http://localhost:8000/api/media", {
    //         method: "POST",
    //         headers: {
    //             Authorization: `Bearer ${user.token}`,
    //         },
    //         body: formData,
    //     });

    //     if (!response.ok) {
    //         const errorData = await response.json();
    //         throw new Error(errorData.error || 'Erreur upload image');
    //     }

    //     return await response.json();
    // };

    //  // nouvelle image
    // async function handleAjoutImageChange(e){
    //     const file = e.target.files[0];
    //     if (file) { // à voir -> mettre image dans dossier pour images (pour être réutilisé) 
    //         // const imageUrl = URL.createObjectURL(file); // url temporaire

    //         try{
    //             const uploaded = await uploadImage(file);
    //             console.log('uploaded : ', uploaded) 
    //             setAltValue(uploaded.alt);

    //             setArticle(prev=>{
    //                 const sections = [...prev.sections];

    //                 sections[index]={
    //                     ...sections[index],
    //                     type: "image",
    //                     contenu: {
    //                         ...sections[index].contenu,
    //                         // url: imageUrl,
    //                         id: uploaded.id,
    //                         url: uploaded.url,
    //                         alt: uploaded.alt,
    //                     }
    //                 }
    //                 return {...prev, sections}
    //             })
    //         } catch (err) {
    //             setError(err.message);
    //         }
    //     }
    // }



    // choix nouvelle image
    

    function handleFileSelect(e){
        const file = e.target.files[0];
        setTempImage(file);
        setAltValue('');
    }

    async function handleValidateUpload() {
        setError('');
        setLoading(true);

        try{
            const formData = new FormData();
            formData.append("file", tempImage);
            formData.append("alt", altValue);

            console.log('formData : ', formData);

            const response = await fetch("http://localhost:8000/api/media", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
                body: formData,
            });

            const uploaded = await response.json();

            if (!response.ok) {
                throw new Error(uploaded.error || 'Erreur upload image');
            }

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
                        alt: uploaded.alt,
                    }
                }
                return {...prev, sections}
            });

            setTempImage(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


   
    // gestion alt 
    function handleAltChange(e){
        const imageAlt = e.target.value;
        setAltValue(imageAlt);

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

                    {/* Faire en sorte que si déjà en BDD -> se réengistre pas ? 
                        -> peut être laisser comme ça en fait
                        -> au cas où veut juste changer pour l'article 
                        -> sinon changerait pour tous les articles*/}
                    {images.map((img) => (
                        <option key={img.id} value={img.id}>
                            {img.alt || "Image sans description"}
                        </option>
                    ))}

                </select>

                <input type="file" id="ajoutImage" name="ajoutImage" accept=".jpg, .png, .webp" onChange={handleFileSelect}/>
            </div>

            <div className="choixAlt">
                <label htmlFor="alt">Choisir un texte alternatif</label>
                <input type="text" id="alt" value={altValue} onChange={handleAltChange}/>
            </div>

            {/* pour valider l'image et l'envoyer en BDD */}
             {tempImage && (
                <button
                    type="button"
                    onClick={handleValidateUpload}
                    disabled={loading}
                >
                    {loading ? "Upload..." : "Valider l’image"}
                </button>
            )}
                
        </div>
    )
}

export {Image};