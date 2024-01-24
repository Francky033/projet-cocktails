// le ".then()" permet de recuperer et gerer la reponse d'une requete asynchrone
import { useState } from "react";
import Header from "../component/Header";

function DescriptionPage() {
  const [cocktails, setCocktails] = useState(null) // "useState" permet de dynamiser une valeur(nom,valeurs,couleur..), donc de la rendre evolutif 
   if (!cocktails) {
//       fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")// la fonction fetch permet de recuper une API via son URL
//     .then((response) => {
//       return response.json(); // convertit la reponse en JSON
//     })
//     .then((json) => {
//       setCocktails(json.drinks);  // affiche le fichier JSON lisible par les utilisateurs
//     });
(async () => {    // "await" permet d'attendre une reponse(la reponse du fetch)
     const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=");
     const json = await response.json();
     setCocktails(json.drinks);
  })()
   }

   

  return (
    <>
    <main>
      <Header/>
      {cocktails ? (  // le "?" remplace le "if" en JS
        <>
          {cocktails.map((cocktail) => {
            return (
              <article>
                <h2>{cocktail.strDrink}</h2>
                <p>Categorie : {cocktail.strCategory}</p>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrinkThumb} />
                <p>Modifié le : {cocktail.dateModified}</p>
              </article>
            );
          })}
        </>
      ) : (
        <p>Dessert en cours de chargement</p>
      )}
    </main>
    </>
    ) 
}
export default DescriptionPage;