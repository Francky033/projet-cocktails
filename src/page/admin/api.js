const API_URL = "http://localhost:3003/api"; // Remplacez par votre URL API

export const fetchCommentaires = async () => {
  const response = await fetch(`${API_URL}/reviews`);
  if (!response.ok) throw new Error('Erreur lors de la récupération des commentaires');
  return response.json();
};

export const deleteCommentaire = async (id) => {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Ajoutez l'en-tête d'autorisation
    },
  });
  if (!response.ok) throw new Error('Erreur lors de la suppression du commentaire');
};

export const updateCommentaire = async (id, updatedComment) => {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Ajoutez l'en-tête d'autorisation
    },
    body: JSON.stringify(updatedComment),
  });
  if (!response.ok) throw new Error('Erreur lors de la mise à jour du commentaire');
  return response.json();
};
