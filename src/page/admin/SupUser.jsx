import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';

function SupUser() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    // Charger le token JWT depuis le stockage local ou les cookies
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      setToken(storedToken);
      fetchUsers(storedToken);
    }
  }, []);

  const fetchUsers = async (storedToken) => {
    try {
      const response = await fetch('http://localhost:3003/api/users', {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      const data = await response.json();
      setUsers(data);
      console.log('Fetched users:', data); // Log fetched users
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleDeleteUser = async (id, username) => {
    // Afficher une boîte de dialogue de confirmation
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${username} ?`);
    if (!confirmDelete) {
      return; // Annuler la suppression si l'utilisateur clique sur "Annuler"
    }
  
    try {
      const response = await fetch(`http://localhost:3003/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erreur lors de la suppression de l'utilisateur : ${errorMessage}`);
      }
  
      // Mise à jour de l'état pour refléter la suppression sans une nouvelle requête
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      console.log(`Utilisateur ${id} supprimé avec succès`);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error.message);
    }
  };
  

  return (
    <>
      <Header />
      <div>
        <h2>Gestion des Utilisateurs</h2>
        {users.length > 0 ? (
          users.map(user => (
            <div key={user.id}>
              <p><strong>{user.username}</strong> ({user.email})</p>
              <button onClick={() => handleDeleteUser(user.id, user.username)}>Supprimer</button>
            </div>
          ))
        ) : (
          <p>Aucun utilisateur trouvé.</p>
        )}
      </div>
    </>
  );
}

export default SupUser;
