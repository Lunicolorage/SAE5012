// import { useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UserProvider } from './context/UserProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { MesRoutes } from './components/MesRoutes';

function App() {

  return (
    <>
    < BrowserRouter >
    <ThemeProvider>
    <UserProvider>
      <Header />
      <main>
        <MesRoutes />
      </main>
      <Footer />
    </UserProvider>
    </ThemeProvider>
    </BrowserRouter>
    </>
  )
}

export default App
