import { useState, createContext,useEffect } from "react";
import ReactDOM from "react-dom/client";

export const UserContext = createContext();

function UserProvider({ children }) {
    
    const [user, setUser] = useState({});

    return (
        <UserContext.Provider 
            value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export{UserProvider};