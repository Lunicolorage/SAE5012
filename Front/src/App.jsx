// import { useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { UserProvider } from './context/UserProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { MesRoutes } from './components/MesRoutes';

function App() {

    const createAllowed = ['ROLE_ADMIN','ROLE_AUTEUR','ROLE_EDIT'];
    const addDataAllowed = ['ROLE_ADMIN','ROLE_FOURNI'];
    const editDesignAllowed = ['ROLE_ADMIN','ROLE_DESIGN'];

  return (
    <>
    < BrowserRouter >
    <ThemeProvider>
    <UserProvider>
      <Header 
        createAllowed={createAllowed}
        addDataAllowed={addDataAllowed}
        editDesignAllowed={editDesignAllowed}
      />
      <main>
        <MesRoutes 
          createAllowed={createAllowed}
          addDataAllowed={addDataAllowed}
          editDesignAllowed={editDesignAllowed}
        />
      </main>
      <Footer 
        createAllowed={createAllowed}
        addDataAllowed={addDataAllowed}
        editDesignAllowed={editDesignAllowed}
      />
    </UserProvider>
    </ThemeProvider>
    </BrowserRouter>
    </>
  )
}

export default App
