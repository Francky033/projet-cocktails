import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../component/Header";
import { createDessert, uploadImage } from "../admin/api"; // Assurez-vous d'importer vos fonctions API

const AjoutDessert = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [duree, setDuree] = useState('');
  const [difficulte, setDifficulte] = useState('');
  const [calories, setCalories] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Fonction pour mettre à jour l'état image avec le fichier sélectionné
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit called");
  
    try {
      console.log("Image sélectionnée:", image);
  
      if (!image) {
        console.error("Aucune image sélectionnée");
        return alert("Veuillez sélectionner une image.");
      }
  
      console.log("Téléchargement de l'image...");
      const formData = new FormData();
      formData.append('image', image); // Ajoute l'image à FormData
  
      console.log("FormData après ajout de l'image:", formData);
  
      // Envoyer formData à votre fonction uploadImage
      const uploadResponse = await uploadImage(formData);
      console.log("Image téléchargée avec succès:", uploadResponse);
  
      const dessertData = {
        nom,
        description,
        categorie,
        ingredients: ingredients.split(','), // Transforme la chaîne d'ingrédients en tableau
        duree,
        difficulte,
        calories,
        imageUrl: uploadResponse.imageUrl,
        preparation: 'Votre valeur de préparation ici', // Placeholder pour la valeur de préparation
      };
  
      console.log("Création du dessert avec les données suivantes:", dessertData);
  
      // Appeler votre fonction createDessert avec dessertData
      await createDessert(dessertData);
      console.log("Dessert créé avec succès");
  
      // Redirection après la création du dessert
      navigate('/admin');
    } catch (error) {
      console.error("Erreur lors de l'ajout du dessert:", error);
    }
  };
  

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input type="text" value={categorie} onChange={(e) => setCategorie(e.target.value)} placeholder="Catégorie" required />
        <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Ingrédients (séparés par des virgules)" required />
        <input type="number" value={duree} onChange={(e) => setDuree(e.target.value)} placeholder="Durée" required />
        <input type="text" value={difficulte} onChange={(e) => setDifficulte(e.target.value)} placeholder="Difficulté" required />
        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Calories" required />
        <input type="file" onChange={handleChange} required /> {/* Utilisation de handleChange pour mettre à jour l'état image */}
        <button type="submit">Ajouter le dessert</button>
      </form>
    </>
  );
};

export default AjoutDessert;
