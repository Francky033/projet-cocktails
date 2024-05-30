import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './FormConnexion.css';
import Header from '../component/Header';
import { jwtDecode } from 'jwt-decode';

const FormConnexion = () => {
  const [pseudo, setPseudo] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
const navigate = useNavigate()


  const handleSubmit =async(e) => {
    e.preventDefault();
    const username = e.target[0].value
    const password = e.target[1].value
    const loginData = {username, password}
    console.log(password, username);
        const loginDataJson = JSON.stringify(loginData)
    const responseOfFetch = await fetch(`http://localhost:3003/api/users/login`, {method : "POST", headers : {"Content-type" : "application/json"}, body : loginDataJson})
        const responseToJson = await responseOfFetch.json()
    
        console.log(responseToJson);

        const token = responseToJson.data

        if(token){
          let decodedToken = jwtDecode(token)
          console.log(decodedToken.data);
            localStorage.setItem("jwt", token)
            if(decodedToken.role === 1){
                navigate('/admin')
            } else {
                navigate('/')
            }
        } else {

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
            
          </>
        ) : (
          <>
            <p>Connectez vous et accédez à votre compte sur Les Desserts de Francky.</p>
            <form onSubmit={handleSubmit}>
              <label>
                <input
                  placeholder='Pseudo*'
                  type="text"
                  onChange={(e) => setPseudo(e.target.value)}
                />
              </label>
              <br />
              <label>
                <input
                  placeholder='Mot de passe*'
                  type="password"
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

export default FormConnexion;