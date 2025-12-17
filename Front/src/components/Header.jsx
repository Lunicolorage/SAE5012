import { Link } from "react-router-dom";

function Header(){

    const menuBurger = document.querySelector('.menuBurger');

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
                Connexion
            </Link>
            <img 
                onClick={() => {
                    menuBurger.classList.toggle('hide');
                }}
            src="src/assets/burger.svg" alt="icone menu burger" className="hideOrdi" />

            <section className="menuBurger hide">
                <Link to="/index">
                Index
                </Link>
                <Link to="/create">
                Ajout d'article
                </Link>
                <Link to="/add-data">
                Ajout de données
                </Link>
                <Link to="/connexion">
                    Connexion
                </Link>
            </section>
        </header>
    );
}

export {Header};