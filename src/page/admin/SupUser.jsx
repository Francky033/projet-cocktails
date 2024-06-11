import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';

function SupUser() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    fetchUsers();
    // Charger le token JWT depuis le stockage local ou les cookies
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/users', {
        headers: {
          Authorization: `Bearer ${token}` // Inclure le token JWT dans l'en-tête
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
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${ username} ?`);
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
      console.log("ici?");
        if (!response.ok) {
          
          throw new Error('Erreur lors de la suppression de l\'utilisateur');
        }
        const result = await response.json();
        console.log('Delete result:', result);

        
        console.log(`Deleting user ${id} ?`);
        // Mise à jour de l'état pour refléter la suppression sans une nouvelle requête
        setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
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
