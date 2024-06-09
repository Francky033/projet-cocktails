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
      if (!response.ok) throw new Error('Erreur lors de la récupération des commentaires');
      const data = await response.json();
      console.log('Fetched reviews:', data); // Log fetched reviews
      setReviews(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const handleUpdateReview = async (id, newData) => {
    console.log(`Updating review ${id} with data:`, newData); // Log update action
    try {
      const response = await fetch(`http://localhost:3003/api/reviews/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du commentaire');
      const result = await response.json();
      console.log('Update result:', result); // Log update result
      fetchReviews();
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDeleteReview = async (id) => {
    console.log(`Deleting review ${id}`); // Log delete action
    try {
      const response = await fetch(`http://localhost:3003/api/reviews/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression du commentaire');
      const result = await response.json();
      console.log('Delete result:', result); // Log delete result
      fetchReviews();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <>
      <Header />
      <div>
        <h2>Modifier/Supprimer Commentaires</h2>
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id}>
              <p><strong>{review.User?.username || 'Utilisateur inconnu'}</strong> a écrit :</p>
              <p>{review.content}</p>
              <p>le <em>{new Date(review.createdAt).toLocaleString()}</em></p>
              <button onClick={() => handleUpdateReview(review.id, { content: 'Nouveau contenu' })}>Modifier</button>
              <button onClick={() => handleDeleteReview(review.id)}>Supprimer</button>
            </div>
          ))
        ) : (
          <p>Aucun commentaire trouvé.</p>
        )}
      </div>
    </>
  );
}

export default SupCom;
