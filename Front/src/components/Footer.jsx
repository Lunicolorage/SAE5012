import { Link } from "react-router-dom";
import { useContext } from 'react'
import { ThemeContext } from "../context/ThemeProvider";

function Footer(){

    const [theme, setTheme, themes] = useContext(ThemeContext);

    const srcImg = theme.name === 'dark' ? 'src/assets/logo-clair.png' : 'src/assets/logo-foncé.png';

    return(
        <footer>
            <div className="footerFlex">
                <div className="footerLinks">
                    <Link to="/index">
                    Index
                    </Link>
                    {/* <Link to="/create">
                    Ajout d'article
                    </Link>
                    <Link to="/add-data">
                    Ajout de données
                    </Link> */}
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