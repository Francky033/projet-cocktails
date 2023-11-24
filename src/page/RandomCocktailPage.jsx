import { useState } from "react";
import Header from "../component/Header";

function RandomCocktailPage() {
    const [RandomCocktail, setRandomCocktail] = useState (null) // je declare une valeur null

    if(!RandomCocktail){
        (async () => { // je fait une function asynchrone qui auto (qui s'execute suele)
            const RandomResponse = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php"); //la function fetch recupere une API en ligne 
            const RandomJson = await RandomResponse.json(); // le "await" permet de faire patienter la promesse fait dans la function async
            setRandomCocktail(RandomJson.drinks) // je recupere les données du tableau (fetch)
        })()
    }

    return (
        <>
        <main>
          <Header/>
          {RandomCocktail ? (  // le "?" remplace le "if" en JS
            <>
              {RandomCocktail.map((cocktail) => { // je fait une boucle pour recuperer ce dont j'ai besoin dans le tableau(fetch)
    return (
        <article>
          <h2>{RandomCocktail.strDrink}</h2> 
          <p>Categorie : {RandomCocktail.strCategory}</p>
          <img src={RandomCocktail.strDrinkThumb} alt={RandomCocktail.strDrinkThumb} />
          <p>Modifié le : {RandomCocktail.dateModified}</p>
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


   
export default RandomCocktailPage