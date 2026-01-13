import { Route, Link, Routes } from "react-router-dom";
import { Accueil } from './accueil/Accueil';
import { PageCreationArticle } from './creationArticle/PageCreationArticle';
import { Donnees } from './ajoutDonnees/Donnees';
import { Articles } from './index/Articles';
import { Connexion } from './connexion/Connexion';
import { AffichageArticle } from './article/AffichageArticle';
import { NotFound } from './NotFound';
import { useContext, useState, useEffect } from 'react'
import { UserContext } from "../context/UserProvider";
import { ThemeDesign } from "./gestionThemes/ThemeDesign";

function MesRoutes() {

    const [user, setUser] = useContext(UserContext);

    const createAllowed = ['ROLE_ADMIN','ROLE_AUTEUR','ROLE_EDIT'];
    const addDataAllowed = ['ROLE_ADMIN','ROLE_FOURNI'];
    const editDesignAllowed = ['ROLE_ADMIN','ROLE_DESIGN'];
    const hasAnyRole = (allowed) => Array.isArray(user?.roles) && user.roles.some(r => allowed.includes(r));


  return (
     <Routes>
          <Route path="/" element={<Accueil />} />
          {hasAnyRole(createAllowed) && (
            <Route path="/create" element={<PageCreationArticle />} />
          )}
          {hasAnyRole(addDataAllowed) && (
            <Route path="/add-data" element={<Donnees />} />
          )}
          {hasAnyRole(editDesignAllowed) && (
            <Route path="/theme-design" element={<ThemeDesign />} />
          )}
          <Route path="/index" element={<Articles/>} />
          <Route path="/connexion" element={<Connexion/>} />
          <Route path="/article/:id" element={<AffichageArticle />} />
          {/* <Route path="/shop" element={<Shop like={[tabLiked, setTabLiked]} card={[tabPanier, setTabPanier]} />} />  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export { MesRoutes }