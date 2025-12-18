import { useContext, useState} from "react";
import { UserContext } from "../../context/UserProvider";
import { FormConnection } from "./FormConnexion";
import { FormRegister } from "./FormRegister";

function Connexion() {

  const [user, setUser] = useContext(UserContext);
  const [isRegister, setIsRegister] = useState(false);

  console.log(user);

    if(user && user.nom){
        return (
        <div>
            <h1>Vous êtes déjà connecté</h1>
            <button
            onClick={() => {
                setUser({});
            }}
            >Me déconnecter</button>
        </div>
        );
    }
    else if(isRegister){
        return(
    <>
      <FormRegister
        register ={[isRegister, setIsRegister]}
      />
    </>
  )
    }

else {
  return(
    <>
      <FormConnection 
        register ={[isRegister, setIsRegister]}
    />
    </>
  )
}

}

export{Connexion};