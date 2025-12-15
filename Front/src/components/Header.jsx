import { Link } from "react-router-dom";

function Header(){
    return(
        <header>
            <div className="header-left">
                <Link to="/">
                    <img className="header-logo" src="src/assets/eff-fonce.png" alt="logo foncé" />
                </Link>
                <Link to="/index" >
                Index
                </Link>
                <Link to="/create" >
                Ajout d'article
                </Link>
                <Link to="/add-data" >
                Ajout de données
                </Link>
            </div>
            <Link to="/connexion">
                Connection
            </Link>
        </header>
    );
}

export {Header};