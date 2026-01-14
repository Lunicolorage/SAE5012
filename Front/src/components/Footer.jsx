import { Link } from "react-router-dom";
import { useContext } from 'react'
import { ThemeContext } from "../context/ThemeProvider";
import { UserContext } from "../context/UserProvider";

function Footer({createAllowed, addDataAllowed, editDesignAllowed}){

    const [theme, setTheme, themes] = useContext(ThemeContext);
    
    const [user, setUser] = useContext(UserContext);
    
    const hasAnyRole = (allowed) => Array.isArray(user?.roles) && user.roles.some(r => allowed.includes(r));


    const srcImg ='src/assets/logo-'+ theme.logoCouleur +'.png';

    return(
        <footer>
            <div className="footerFlex">
                <div className="footerLinks">
                    <Link to="/index">
                    Index
                    </Link>
                    {hasAnyRole(createAllowed) && (
                    <Link to="/create" >
                    Ajout d'article
                    </Link>
                    )}

                    {hasAnyRole(addDataAllowed) && (
                        <Link to="/add-data" >
                        Ajout de données
                        </Link>
                    )}       

                    {hasAnyRole(editDesignAllowed) && (
                    <Link to="/theme-design" >
                        Modifier thème
                    </Link>
                    )}
                    <Link to="/connexion">
                        Connexion
                    </Link>
                </div>
                <img src={srcImg} alt="logo seriouscience" />
                <div>
                    <p>Mentions légales</p>
                    <p>Politique de confidentialité</p>
                </div>
            </div>
            <p className="copyright">Copyright @ 2525 Seriouscience</p>
        </footer>
    );
}

export {Footer};