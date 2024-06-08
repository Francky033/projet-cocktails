import React, { useState } from "react";
import Header from "../../component/Header";

function AjoutDessert({ onAddRecipe }) {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [image, setImage] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [duree, setDuree] = useState('');
  const [difficulte, setDifficulte] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      nom,
      description,
      categorie,
      image,
      ingredients,
      duree,
      difficulte,
      calories
    };

    try {
      const response = await fetch('http://localhost:3003/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecipe),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Votre logique après l'envoi réussi
      console.log('Recette ajoutée avec succès:', await response.json());

      // Réinitialiser le formulaire
      setNom('');
      setDescription('');
      setCategorie('');
      setImage('');
      setIngredients('');
      setDuree('');
      setDifficulte('');
      setCalories('');

      // Appeler onAddRecipe si nécessaire pour mettre à jour l'état parent
      onAddRecipe(newRecipe);

    } catch (error) {
      console.error('Erreur lors de l\'ajout de la recette:', error);
    }
  };

  return (
    <>
      <Header />
      <h2>Ajoutez une nouvelle recette</h2>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="image">Image URL :</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
            type="text"
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
            type="text"
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
