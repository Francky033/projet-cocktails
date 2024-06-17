import React, { useState } from "react";
import Header from "../../component/Header";

function AjoutDessert({ onAddDessert }) {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [duree, setDuree] = useState('');
  const [difficulte, setDifficulte] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Vérifier que tous les champs requis sont remplis
    if (!nom || !description || !categorie || !ingredients || !duree || !difficulte || !calories) {
      console.error('Tous les champs doivent être remplis');
      return;
    }
  
    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('categorie', categorie);
  
    // Ajouter l'image uniquement si elle est sélectionnée
    if (image) {
      formData.append('image', image);
    }
  
    // Convertir les ingrédients en JSON
    const ingredientsArray = ingredients.split(',').map(ingredient => ingredient.trim());
    formData.append('ingredients', JSON.stringify(ingredientsArray));
  
    formData.append('duree', duree);
    formData.append('difficulte', difficulte);
    formData.append('calories', calories);
  
    try {
      const response = await fetch('http://localhost:3003/api/desserts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message}`);
      }
  
      const result = await response.json();
      console.log('Dessert ajouté avec succès:', result);
  
      // Réinitialiser les champs du formulaire après succès
      setNom('');
      setDescription('');
      setCategorie('');
      setImage(null);
      setIngredients('');
      setDuree('');
      setDifficulte('');
      setCalories('');
  
      // Appeler la fonction pour ajouter le dessert à la liste des desserts
      onAddDessert(result);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du dessert:', error);
    }
  };
  

  return (
    <>
      <Header />
      <h2>Ajoutez un nouveau dessert</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="nom">Nom :</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="categorie">Catégorie :</label>
          <select
            id="categorie"
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            required
          >
            <option value="">Choisissez une catégorie</option>
            <option value="chocolat">Chocolat</option>
            <option value="fruit">Fruit</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Image :</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingrédients :</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="duree">Durée :</label>
          <input
            type="number"
            id="duree"
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="difficulte">Difficulté :</label>
          <select
            id="difficulte"
            value={difficulte}
            onChange={(e) => setDifficulte(e.target.value)}
            required
          >
            <option value="">Sélectionnez la difficulté</option>
            <option value="facile">Facile</option>
            <option value="moyen">Moyen</option>
            <option value="difficile">Difficile</option>
          </select>
        </div>
        <div>
          <label htmlFor="calories">Calories :</label>
          <input
            type="number"
            id="calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}

export default AjoutDessert;

