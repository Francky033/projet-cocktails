import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';

function ModifierDessert() {
  const [desserts, setDesserts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDesserts();
  }, []);

  const fetchDesserts = async () => {
    try {
      const response = await fetch(`http://localhost:3003/api/dessert`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des desserts');
      }
      const data = await response.json();
      setDesserts(data);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  const handleEditDessert = (id) => {
    // Logique pour modifier le dessert avec l'ID spécifié
  };

  const handleDeleteDessert = async (id) => {
    // Logique pour supprimer le dessert avec l'ID spécifié
  };

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur: {error}</p>;
  }

  return (
    <>
    <Header />
    <div>
      <h2>Dessert Dashboard</h2>
      {desserts.map((dessert) => (
        <div key={dessert.id}>
          <h3>{dessert.nom}</h3>
          <p>Description: {dessert.description}</p>
          <button onClick={() => handleEditDessert(dessert.id)}>Modifier</button>
          <button onClick={() => handleDeleteDessert(dessert.id)}>Supprimer</button>
        </div>
      ))}
    </div>
    </>
  );
}

export default ModifierDessert;
