import { useContext, useState } from "react";
import { UserContext } from "../../context/UserProvider";

function FormRegister({ register }) {

    const [user, setUser] = useContext(UserContext);
    const [isRegister, setIsRegister] = register;

    const [mdp, setMdp] = useState('');
    const [mail, setMail] = useState('');
    const [nom, setNom] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json',
                },
                body: JSON.stringify({
                    email: mail,
                    nom: nom,
                    password: mdp,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(` ${errorData.detail || 'Erreur lors de l\'inscription'}`);
                setLoading(false);
                return;
            }

            const loginResponse = await fetch('http://localhost:8000/api/login_check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: mail,
                    password: mdp,
                }),
            });

            if (!loginResponse.ok) {
                setError(" Inscription réussie, mais échec de la connexion automatique.");
                setLoading(false);
                return;
            }

            const loginData = await loginResponse.json();
            const token = loginData.token;

            const meResponse = await fetch('http://localhost:8000/api/me', {
                headers: { Authorization: `Bearer ${token}` },
            });

            const userInfo = await meResponse.json();

            const userDico = {
                id: userInfo.id,
                nom: userInfo.nom,
                email: userInfo.email,
                role: userInfo.roles,
                token: token,
            };

            setUser(userDico);

            Object.entries(userDico).forEach(([key, value]) => {
                localStorage.setItem('user_' + key, value);
            });

            setSuccess(' Inscription et connexion réussies !');

            setMail('');
            setNom('');
            setMdp('');

        } catch (err) {
            setError(` Erreur réseau: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="pageConnexion">
            <h1>S'inscrire</h1>
            <div className="formConnexion">

                <label htmlFor="nom">Nom</label>
                <input
                    required
                    id="nom"
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    required
                    id="email"
                    type="email"
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                />

                <label htmlFor="psw">Mot de passe</label>
                <input
                    required
                    id="psw"
                    type="password"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <button
                    onClick={handleRegister}
                    disabled={loading || !mail || !mdp || !nom}
                >
                    {loading ? 'Inscription en cours...' : 'Créer un compte'}
                </button>

                <p className="changeForm"
                    onClick={() => {
                        setIsRegister(!isRegister);
                    }}
                >
                    Se connecter
                </p>
            </div>
        </section>
    );
}

export { FormRegister };
