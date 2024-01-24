import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FormConnexion.css';
import Header from '../component/Header';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Email:', email);
    console.log('Password:', password);

  
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
            <p>Bienvenue!</p>
            <button className='btn_connect' onClick={handleLogout}>Je me déconnecte</button>
          </>
        ) : (
          <>
            <p>Connectez vous et accédez à votre compte sur Les Desserts de Francky.</p>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  placeholder='Email*'
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <p>* Champs obligatoire</p>
              <button className='btn_connect' type="submit">Se Connecter</button>
            </form>
            <Link to="/inscription"><p>Je n'ai pas de compte, je m'inscris</p></Link>
          </>
        )}
      </div>
    </>
  );
};

export default App;
