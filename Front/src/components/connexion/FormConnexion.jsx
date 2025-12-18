import { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";

function FormConnection({register}){

    const [isRegister, setIsRegister] = register;

    const Users=[
        {id:1, nom:"lucile", mail:"lucile@mail", pwd: "123456"},
        {id:2, nom:"nowa", mail:"nowa@mail", pwd: "test1"},
        {id:3, nom:"keno", mail:"keno@mail", pwd: "fezan"},
        {id:4, nom:"blip", mail:"blip@mail", pwd: "blipadabim"},
    ];

    const [user, setUser] = useContext(UserContext);

    const [mdp, setMdp] = useState('');
    const [mail, setMail] = useState('');

    return(
    <section className="pageConnexion">
        <h1>Connexion</h1>
        <div className="formConnexion">
            <label htmlFor="id">Email</label>
            <input name="id" type="text" value={mail}
            onChange={(e) => setMail(e.target.value)}
            />
            <label htmlFor="psw">Mot de passe</label>
            <input name="psw" type="password" value={mdp} 
            onChange={(e) => setMdp(e.target.value)}
            />
            <button
            onClick={() => {
                Users.forEach(element => {
                if (element.mail == mail && element.pwd == mdp){
                    setUser({'id':element.id , 'nom' : element.nom, 'mail' : mail  });
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