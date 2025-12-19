import { useState, createContext,useEffect } from "react";
import ReactDOM from "react-dom/client";

export const UserContext = createContext();

function UserProvider({ children }) {

    let storage_user = {};

    if (localStorage.user_id){
        storage_user ={
            'id' : localStorage.user_id,
            'nom' : localStorage.user_nom,
            'email' : localStorage.user_email,
            'role': localStorage.user_role ,
            'token' : localStorage.user_token
         };
    }
        
    const [user, setUser] = useState(storage_user);

    return (
        <UserContext.Provider 
            value={[user,setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export{UserProvider};