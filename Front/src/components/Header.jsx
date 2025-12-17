import { Link } from "react-router-dom";

function Header(){
    return(
        <header>
            <div className="header-left">
                <Link to="/">
                    <img className="header-logo" src="src/assets/eff-fonce.png" alt="logo foncé" />
                </Link>
                <Link to="/index" className="hideMobile" >
                Index
                </Link>
                <Link to="/create" className="hideMobile" >
                Ajout d'article
                </Link>
                <Link to="/add-data" className="hideMobile" >
                Ajout de données
                </Link>
            </div>
            <Link to="/connexion" className="hideMobile" >
                Connection
            </Link>
            <img src="src/assets/burger.svg" alt="icone menu burger" className="hideOrdi" />
        </header>
    );
}

export {Header};