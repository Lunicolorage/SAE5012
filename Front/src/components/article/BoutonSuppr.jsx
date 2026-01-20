import { useState, useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { useNavigate } from "react-router-dom";

export function BoutonSuppr({article}){

    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    async function Supprimer(idArticle){
        const url = 'http://localhost:8000/api/articles/'+article.id+'/full';
        setLoading(true);
        
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            else{
                console.log('Article supprimé avec succès');
                navigate("/index", {state: { success: "Article supprimé avec succès"}})
            }
            
        } catch (err) {
            console.error("Erreur lors de la supression de l'article:", err.message);
        }finally {
            setLoading(false);
        }
    }

    return(
        <button 
            onClick={() => {Supprimer(article.id)}}
            className="articleSolo-suppr">
            {loading ? "Chargement..." : "Supprimer"}
            </button>
    )
}
