import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserProvider";

function FormRegister({register}){

    const [user, setUser] = useContext(UserContext);

    const [isRegister, setIsRegister] = register;

    const [mdp, setMdp] = useState('');
    const [nom, setNom] = useState('');

    return(
    <section className="pageConnexion">
        <h1>S'inscrire</h1>
        <div className="formConnexion">
            <label htmlFor="id">Nom d'utilisateur</label>
            <input name="id" type="text" value={nom}
            onChange={(e) => setNom(e.target.value)}
            />
            <label htmlFor="psw">Mot de passe</label>
            <input name="psw" type="password" value={mdp} 
            onChange={(e) => setMdp(e.target.value)}
            />
            <button
            onClick={() => {
                
            }}
            >Creer un compte</button>
        <p className="changeForm"
            onClick={() => {
                setIsRegister(!isRegister);
            }}
        >Se connecter</p>
        </div>
    </section>
    )
}

export{FormRegister};