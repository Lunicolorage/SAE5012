import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../context/UserProvider";

function Header(){

    const [user, setUser] = useContext(UserContext);
    const [buttonCo, setButtonCo] = useState("Connexion");

    useEffect(() => {
        if(user && user.id){
            setButtonCo(user.nom)
        }
        else{
            setButtonCo("Connexion")
        }
    }, [user]);

    const menuBurger = document.querySelector('.menuBurger');

    const [burgerOuvert, setBurgerOuvert] = useState(false);

    useEffect(() => {
    if(menuBurger){
        menuBurger.classList.toggle('hide');
    }
  }, [burgerOuvert]);

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
                {buttonCo}
            </Link>
            <img 
                onClick={() => {
                    setBurgerOuvert(!burgerOuvert);
                }}
                src="src/assets/burger.svg" alt="icone menu burger" className="hideOrdi" />

            <section className="menuBurger hide">
                <img
                    onClick={() => {
                        setBurgerOuvert(!burgerOuvert);
                    }}
                    src="src/assets/croix.png" alt="icone fermeture burger" />
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
                    {buttonCo}
                </Link>
            </section>
        </header>
    );
}

export {Header};