import { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";

function FormConnection({register}){

    const [isRegister, setIsRegister] = register;
    const [user, setUser] = useContext(UserContext);

    const [mdp, setMdp] = useState('');
    const [mail, setMail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    

    const handleConnexion = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/login_check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: mail,
                    password: mdp,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                //localStorage.setItem('token', data.token);

                const response2 = await fetch('http://localhost:8000/api/me', {
                    headers: {
                        Authorization: `Bearer ${data.token}`
                    }
                });

                
                const userInfo = await response2.json();

                const userDico = {'id' : userInfo.id, 
                        'nom' : userInfo.nom, 
                        'email' : userInfo.email,
                        'roles': userInfo.roles ,
                        'token' : data.token
                    }
                
                setUser(userDico);

                Object.entries(userDico).forEach(([key, value]) => {
                    const dataToStore = Array.isArray(value) ? JSON.stringify(value) : value;
                    localStorage.setItem('user_' + key, dataToStore);
                });

                // localStorage.setItem('user_id', userInfo.id);

                //console.log(user);
                console.log(localStorage);
                setSuccess(' Connexion réussie !');
                setMail('');
                setMdp('');
            } else {
                setError(' Email ou mot de passe incorrect');
            }
        } catch (err) {
            setError(` Erreur réseau: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return(
        <section className="pageConnexion">
            <h1>Connexion</h1>
            <div className="formConnexion">
                <label htmlFor="id">Email</label>
                <input 
                    id="id"
                    name="id" 
                    type="email" 
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />
                
                <label htmlFor="psw">Mot de passe</label>
                <input 
                    id="psw"
                    name="psw" 
                    type="password" 
                    value={mdp} 
                    onChange={(e) => setMdp(e.target.value)}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button
                    onClick={handleConnexion}
                    disabled={loading || !mail || !mdp}
                >
                    {loading ? 'Connexion en cours...' : 'Se connecter'}
                </button>

                <p className="changeForm"
                    onClick={() => {
                        setIsRegister(!isRegister);
                    }}
                >
                    Créer un compte
                </p>
            </div>
        </section>
    )
}

export { FormConnection };