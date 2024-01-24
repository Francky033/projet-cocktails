import React, { useState } from 'react';
import './FormInscription.css';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';

const FormInscription = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ajoutez ici la logique de validation ou d'inscription avec les informations fournies.
    console.log('Pseudo:', pseudo);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <>
        <Header/>
        <h2>Inscription</h2>
    <div className="App">
        <div className='out_form'>
        <p>Inscrivez vous et accédez gratuitement aux nombreuses avantage sur Les Desserts de Francky.</p>
        </div>
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
        <label>
          
          <input
            placeholder='Confirmer le mot de passe*'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <p>* Champs obligatoire</p>
        <button className='btn_inscrit' type="submit">Je m'inscrit</button>
      </form>
      <Link to="/connexion"><p>J'ai déjà un compte, je me connecte</p></Link>
    </div>

    <Footer/>
 </> );
};

export default FormInscription;
