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
    fetchCommentaires();
  }, [id]);

  const fetchDessert = async () => {
    try {
      const response = await fetch(`http://localhost:3003/api/dessert/${id}`);
      const data = await response.json();
      setDessert(data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du dessert :", error);
    }
  };

  const fetchCommentaires = async () => {
    try {
      const response = await fetch(`http://localhost:3003/api/reviews?DessertId=${id}`);
      const data = await response.json();
      console.log("Commentaires récupérés : ", data); // Debug
      setCommentaires(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires :", error);
    }
  };

  const handleCommentaire = async (commentaire) => {
    if (!token) {
      console.error("Token non trouvé");
      return;
    }

    const commentaireCreate = {
      commentaire,
      DessertId: id
    };

    try {
      const response = await fetch(`http://localhost:3003/api/reviews`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(commentaireCreate)
      });

      const result = await response.json();
      console.log("Commentaire ajouté : ", result); // Debug
      fetchCommentaires(); // Rafraîchir les commentaires après ajout
    } catch (error) {
      console.error("Erreur lors de l'envoi du commentaire :", error);
    }
  };

  return (
    <>
      <main>
        <Header />
        {dessert ? (
          <>
            <article className="pageDes">
              <h4>{dessert.nom}</h4>
              <img className="img_Des" src={dessert.image} alt={dessert.nom} />
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

            {token && (
              <div className="commentaire-section">
                <h2>Ajouter un commentaire</h2>
                <form className="com" onSubmit={(e) => {
                  e.preventDefault();
                  const commentaire = e.target.commentaire.value;
                  console.log(commentaire, commentaires)
                  handleCommentaire(commentaire);
                  e.target.commentaire.value = '';
                }}>
                  <textarea
                    placeholder="Donnez votre avis"
                    type="text"
                    name="commentaire"
                  />
                  <button className="btn_connect" type="submit">Commenter</button>
                </form>
              </div>
            )}

            <div className="commentaires-list">
            <h2>Commentaires</h2>
              {commentaires && commentaires.length > 0 ? (
                commentaires.map((comment) => (
                  <div key={comment.id} className="commentaire-item">
                    <p><strong>{comment.User.username}</strong>: {comment.commentaire}</p>
                  </div>
                ))
              ) : (
                <p>Aucun commentaire</p>
              )}
            </div>
          </>
        ) : (
          <p>Dessert en cours de chargement</p>
        )}
      </main>
    </>
  );
}

export default DescriptionPage;
