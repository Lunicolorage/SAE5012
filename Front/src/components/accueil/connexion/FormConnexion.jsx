import { useContext, useState } from "react";
import { UserContext } from "../../../context/UserProvider";

function FormConnection({register}){

    const [isRegister, setIsRegister] = register;

    const Users=[
        {id:1, nom:"lucile", pwd: "123456"},
        {id:2, nom:"nowa", pwd: "test1"},
        {id:3, nom:"keno", pwd: "fezan"},
        {id:4, nom:"blip", pwd: "blipadabim"},
    ];

    const [user, setUser] = useContext(UserContext);

    const [mdp, setMdp] = useState('');
    const [nom, setNom] = useState('');

    return(
    <section className="pageConnexion">
        <h1>Connexion</h1>
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
                Users.forEach(element => {
                if (element.nom == nom && element.pwd == mdp){
                    setUser({'id':element.id , 'nom' : nom });
                }
                });
            }}
            >Se connecter</button>
        <p className="changeForm"
            onClick={() => {
                setIsRegister(!isRegister);
            }}
        >Créer un compte</p>
        </div>
    </section>
    )
}

export{FormConnection};