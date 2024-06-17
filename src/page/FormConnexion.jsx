import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FormConnexion.css';
import Header from '../component/Header';
import { jwtDecode } from 'jwt-decode';

const FormConnexion = () => {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null); // État pour gérer les erreurs
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = pseudo;
    const userPassword = password;
    const loginData = { username, password: userPassword };
    const loginDataJson = JSON.stringify(loginData);

    try {
      const responseOfFetch = await fetch(`http://localhost:3003/api/users/login`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: loginDataJson
      });

      if (!responseOfFetch.ok) {
        const errorData = await responseOfFetch.json();
        throw new Error(errorData.message); // Lève une erreur avec le message d'erreur du serveur
      }

      const responseToJson = await responseOfFetch.json();
      const token = responseToJson.data;

      if (token) {
        let decodedToken = jwtDecode(token);
        localStorage.setItem('jwt', token);
        if (decodedToken.role === 1) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message); // Définit l'état de l'erreur avec le message d'erreur
    }

    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <>
      <Header />
      <h2>Connexion</h2>
      <div className="App">
        {isLoggedIn ? (
          <>
            {<p>Mot de passe ou Pseudo incorrect</p>}
          </>
        ) : (
          <>
            <p>Connectez vous et accédez à votre compte sur Les Desserts de Francky.</p>
            {error && <p className="error-message">{error}</p>} {/* Affichage de l'erreur s'il y en a une */}
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  placeholder='Pseudo*'
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </label>
              <br />
              <label>
                <input
                  placeholder='Mot de passe*'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <p>* Champs obligatoires</p>
              <button className='btn_connect' type="submit">Se Connecter</button>
            </form>
            <Link to="/inscription"><p>Je n'ai pas de compte, je m'inscris</p></Link>
          </>
        )}
      </div>
    </>
  );
};

export default FormConnexion;
