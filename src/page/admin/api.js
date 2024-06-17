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


export const createDessert = async (formData) => {
  try {
    // Vérification des champs requis
    const { nom, description, categorie, ingredients, duree, difficulte, calories } = formData;
    if (!nom || !description || !categorie || !ingredients || !duree || !difficulte || !calories) {
      throw new Error('Tous les champs doivent être remplis');
    }

    const response = await fetch(`${API_URL}/desserts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez ici l'authentification 
         //'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};


export const uploadImage = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/desserts/image`, {
      method: 'POST',
      headers: {
        // Ajoutez ici l'authentification
        //'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};