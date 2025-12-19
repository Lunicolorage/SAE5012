// import { useState } from 'react'
import './App.css'
import { Donnees } from './components/ajoutDonnees/Donnees'
import { Articles } from './components/index/Articles'
import { PageCreationArticle } from './components/creationArticle/PageCreationArticle'
import { Route, Link, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { NotFound } from './components/NotFound';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Accueil } from './components/accueil/Accueil';
import { Connexion } from './components/connexion/Connexion';
import { UserProvider } from './context/UserProvider';
import { AffichageArticle } from './components/article/AffichageArticle';

function App() {

  return (
    <>
    < BrowserRouter >
    <UserProvider>
      <Header />
      <main>
      <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/create" element={<PageCreationArticle />} />
          <Route path="/add-data" element={<Donnees />} />
          <Route path="/index" element={<Articles/>} />
          <Route path="/connexion" element={<Connexion/>} />
          <Route path="/article/" element={<AffichageArticle/>} />
          {/* <Route path="/shop" element={<Shop like={[tabLiked, setTabLiked]} card={[tabPanier, setTabPanier]} />} />  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </UserProvider>
    </BrowserRouter>
    </>
  )
}

export default App
