import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';

function SupCom() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/reviews');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commentaires');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateReview = async (id, newData) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour du commentaire');
      }
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression du commentaire');
      }
      fetchReviews();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Header />
    <div>
      <h2>Modifier/Supprimer Commentaires</h2>
      {reviews.map(review => (
        <div key={review.id}>
          <p>{review.content}</p>
          <button onClick={() => handleUpdateReview(review.id, { content: 'Nouveau contenu' })}>Modifier</button>
          <button onClick={() => handleDeleteReview(review.id)}>Supprimer</button>
        </div>
      ))}
    </div>
    </>
  );
}

export default SupCom;
