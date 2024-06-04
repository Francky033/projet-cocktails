import React, { useState } from 'react';
import './FormInscription.css';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';

const FormInscription = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null)

  const navigate = useNavigate()

  const handleSubmit =async (event) => {
    event.preventDefault();
    const username = event.target.username.value
    const password = event.target.password.value
    const email = event.target.email.value
const userToCreate = {
        username : username,
        password : password,
        email : email,
        RoleId : 2}

        
const userCreateToJson = JSON.stringify(userToCreate)
    const createUserResponse = await fetch("http://localhost:3003/api/users", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : userCreateToJson
    })
    if(createUserResponse.status === 200 || createUserResponse.status === 201 ) {
        setMessage(`Merci de votre inscription`)
        navigate('/connexion')
    }
    else {setMessage(`L'utilisateur existe deja`)}
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
          <input name='username'
            placeholder='Pseudo*'
            type="text"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </label>
        <br />
        <label>
         
          <input name='email'
            placeholder='Email*'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input name='password'
            placeholder='Mot de passe*'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <p>* Champs obligatoire</p>
        <button className='btn_inscrit' type="submit">Je m'inscrit</button>
      </form>
      {message && <p>{message}</p>}
      <Link to="/connexion"><p>J'ai déjà un compte, je me connecte</p></Link>
    </div>

    <Footer/>
 </> );
};

export default FormInscription;
