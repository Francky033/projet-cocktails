// le ".then()" permet de recuperer et gerer la reponse d'une requete asynchrone
import { useState } from "react";
import Header from "../component/Header";
import { Link } from "react-router-dom";

function DrinksPage() {
  const [drinkspage, setDrinkspage] = useState(null) // "useState" permet de dynamiser une valeur(nom,valeurs,couleur..), donc de la rendre evolutif 
   if (!drinkspage) {
//       fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")// la fonction fetch permet de recuper une API via son URL
//     .then((response) => {
//       return response.json(); // convertit la reponse en JSON
//     })
//     .then((json) => {
//       setCocktails(json.drinks);  // affiche le fichier JSON lisible par les utilisateurs
//     });
(async () => {    // "await" permet d'attendre une reponse(la reponse du fetch)
     const response = await fetch(" https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list");
     const json = await response.json();
     setDrinkspage(json.drinks);
  })()
   }

   

  return (
    <>
    <main>
      <Header/>
      {drinkspage ? (  // le "?" remplace le "if" en JS
        <>
          {drinkspage.map((drinkspage) => {
            return (
              <article>
                {drinkspage.strCategory == "Cocktail" && (
                    <Link to= "/cocktails"><button>{drinkspage.strCategory}</button></Link>
                )}
                <h2>{drinkspage.strDrink}</h2>
                <p>Categorie : {drinkspage.strCategory}</p>
                
              </article>
            );
          })}
        </>
      ) : (
        <p>Cocktails en cours de chargement</p>
      )}
    </main>
    </>
    ) 
}
export default DrinksPage