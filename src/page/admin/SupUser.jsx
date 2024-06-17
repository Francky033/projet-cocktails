import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import { deleteUser, findAllUsers } from '../admin/api'; // Assurez-vous d'importer les fonctions d'API nécessaires

function SupUser() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('jwt');
    if (storedToken) {
      setToken(storedToken);
      fetchUsers(storedToken);
    }
  }, []);

  const fetchUsers = async (storedToken) => {
    try {
      const users = await findAllUsers(storedToken);
      setUsers(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  const handleDeleteUser = async (id, username) => {
    const confirmDelete = window.confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${username} ?`);
    if (!confirmDelete) {
      return;
    }
  
    try {
      await deleteUser(id, token); // Appel à la fonction deleteUser pour supprimer l'utilisateur

      // Mise à jour de l'état pour exclure l'utilisateur supprimé
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
      console.log(`Utilisateur ${id} supprimé avec succès`);
  
      // Rafraîchir la liste des utilisateurs après la suppression
      fetchUsers(token);
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
