import { useEffect, useState } from "react";
import Header from "../component/Header";
import { useParams } from "react-router-dom";
import "./DescriptionPage.css";

function DescriptionPage() {
  const { id } = useParams();
  const [dessert, setDessert] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const token = localStorage.getItem('jwt');

  useEffect(() => {
    fetchDessert();
  }, []);

  const fetchDessert = async () => {
    try {
      const responseOfFetch = await fetch(`http://localhost:3003/api/dessert/${id}`);
      const responseToJson = await responseOfFetch.json();
      setDessert(responseToJson.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du dessert :", error);
    }
  };

  const fetchCommentaires = async () => {
    try {
      const responseOfFetch = await fetch(`http://localhost:3003/api/reviews/${id}`);
      const responseToJson = await responseOfFetch.json();

      
      const commentsArray = Array.isArray(responseToJson) ? responseToJson : [responseToJson];

      setCommentaires(commentsArray);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  };

  // ...

const Commentaires = ({ onCommentAdded }) => {
  const [commentaire, setCommentaire] = useState("");

  const handleCommentaire = async (event) => {
    event.preventDefault();

    if (!token) {
      return;
    }

    const commentaireCreate = {
      commentaire: commentaire,
      DessertId: id
    };

    try {
      const responseOfFetch = await fetch(`http://localhost:3003/api/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(commentaireCreate)
      });

      const responseToJson = await responseOfFetch.json();
      onCommentAdded(); // Callback pour rafraîchir les commentaires
      setCommentaire(""); // Efface le champ de commentaire après l'envoi
      fetchDessert();
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
    }
  };

 
  return (
    <div>
      <h2>Commentaires</h2>
      <form className="com" onSubmit={handleCommentaire}>
        <textarea
          placeholder="Donnez votre avis"
          type="text"
          name="commentaire"
          value={commentaire}
          onChange={(e) => setCommentaire(e.target.value)}
        />
        <button className="btn_connect" type="submit">Commenter</button>
      </form>

      {/* Espace pour afficher les commentaires */}
      <div className="commentaires-list">
  {commentaires && commentaires.length > 0 ? (
    commentaires.map((comment) => (
      <div key={comment.id} className="commentaire-item"> 
        <p>{comment.texte}</p> 
      </div>
    ))
  ) : (
    <p>Aucun commentaire</p>
  )}
</div>
    </div>
  );
};

// ...


  return (
    <>
      <main>
        <Header />
        {dessert ? (
          <>
            <article className="pageDes">
              <h4>{dessert.nom}</h4>
              <img className="img_Des" src={dessert.image} alt="teste" />
              <ul>
                <li><strong>Durée</strong> : {dessert.duree}</li>
                <li><strong>Difficulté</strong> : {dessert.difficulte}</li>
                <li><strong>Calories </strong> : {dessert.calories} kcal</li>
              </ul>
              <div>
                <h3>Ingrédients</h3>
                <div>
                  {dessert.ingredients.map((ingredient, index) => (
                    <div key={index}>{ingredient}</div>
                  ))}
                </div>
              </div>
              <h3>Préparation</h3>
              <p className="prepa">{dessert.preparation}</p>
            </article>

            <Commentaires onCommentAdded={fetchCommentaires} />
          </>
        ) : (
          <p>Dessert en cours de chargement</p>
        )}

      {/* {dessert ? (
          dessert.data.

        ):(
          <p>en cours de chargement</p>
        )} */}
      </main>
    </>
  );

 
}

export default DescriptionPage;
