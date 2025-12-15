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

function App() {

  return (
    <>
    < BrowserRouter >
      <Header />

      <Routes>

          <Route path="/create" element={<PageCreationArticle />} />
          <Route path="/add-data" element={<Donnees />} />
          <Route path="/index" element={<Articles/>} />
          {/* <Route path="/shop" element={<Shop like={[tabLiked, setTabLiked]} card={[tabPanier, setTabPanier]} />} />  */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      <Footer />

    </BrowserRouter>
    </>
  )
}

export default App
