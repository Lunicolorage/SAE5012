import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../context/UserProvider";
import { ThemeContext } from "../context/ThemeProvider";

function Header({createAllowed, addDataAllowed, editDesignAllowed}){


    const [theme, setTheme, themes] = useContext(ThemeContext);


    const srcImg = theme.name === 'dark' ? 'src/assets/eff-clair.png' : 'src/assets/eff-fonce.png';

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

    const hasAnyRole = (allowed) => Array.isArray(user?.roles) && user.roles.some(r => allowed.includes(r));

    return(
        <header>
            <div className="header-left">
                <Link to="/">
                    <img className="header-logo" src={srcImg} alt="logo EFF" />
                </Link>
                <Link to="/index" className="hideMobile" >
                Index
                </Link>
                {hasAnyRole(createAllowed) && (
                    <Link to="/create" className="hideMobile" >
                    Ajout d'article
                    </Link>
                )}

                {hasAnyRole(addDataAllowed) && (
                    <Link to="/add-data" className="hideMobile" >
                    Ajout de données
                    </Link>
                )}       

                {hasAnyRole(editDesignAllowed) && (
                <Link to="/theme-design" className="hideMobile" >
                    Modifier thème
                </Link>
                )}
            </div>
            <Link to="/connexion" className="hideMobile" >
                {buttonCo}
            </Link>
            <img 
                onClick={() => {
                    setBurgerOuvert(!burgerOuvert);
                }}
                src="src/assets/burger.svg" alt="icone menu burger" className="hideOrdi icone" />

            <section className="menuBurger hide">
                <img
                    className="icone"
                    onClick={() => {
                        setBurgerOuvert(!burgerOuvert);
                    }}
                    src="src/assets/croix.png" alt="icone fermeture burger" />
                <Link 
                    onClick={() => {
                        setBurgerOuvert(!burgerOuvert);
                    }}
                    to="/index">
                Index
                </Link>
                {hasAnyRole(createAllowed) && (
                    <Link 
                        onClick={() => {
                        setBurgerOuvert(!burgerOuvert);
                    }}
                    to="/create">
                    Ajout d'article
                    </Link>
                )}
               {hasAnyRole(addDataAllowed) && (
                    <Link to="/add-data" 
                        onClick={() => {
                        setBurgerOuvert(!burgerOuvert);
                    }}>
                    Ajout de données
                    </Link>
                )} 

                 {hasAnyRole(editDesignAllowed) && (
                <Link 
                    onClick={() => {
                        setBurgerOuvert(!burgerOuvert);
                    }}
                to="/theme-design">
                    Modifier thème
                </Link>
                )}

                <Link 
                    onClick={() => {
                        setBurgerOuvert(!burgerOuvert);
                    }}
                to="/connexion">
                    {buttonCo}
                </Link>
            </section>
        </header>
    );
}

export {Header};