import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import { fetchCommentaires, deleteCommentaire, updateCommentaire } from "../admin/api";
import "./SupCom.css";

function SupCom() {
  const [commentaires, setCommentaires] = useState([]);
  const [editCommentaire, setEditCommentaire] = useState(null);
  const [updatedText, setUpdatedText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCommentaires();
        setCommentaires(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des commentaires :", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCommentaire(id);
      setCommentaires(commentaires.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire :", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const updated = await updateCommentaire(id, { commentaire: updatedText });
      setCommentaires(commentaires.map((comment) => (comment.id === id ? updated : comment)));
      setEditCommentaire(null);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du commentaire :", error);
    }
  };

  const startEditing = (comment) => {
    setEditCommentaire(comment.id);
    setUpdatedText(comment.commentaire);
  };

  return (
    <div className="dashboard">
      <Header />
      <h2>Tableau de bord des commentaires</h2>
      <ul className="commentaires-list">
        {commentaires.map((comment) => (
          <li key={comment.id} className="commentaire-item">
            <span>{comment.User.username}</span> {/* Affichage du nom de l'utilisateur */}
            <span>{comment.commentaire}</span>
            {editCommentaire === comment.id ? (
              <div>
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                />
                <button onClick={() => handleUpdate(comment.id)}>Sauvegarder</button>
                <button onClick={() => setEditCommentaire(null)}>Annuler</button>
              </div>
            ) : (
              <>
                <button onClick={() => startEditing(comment)}>Modifier</button>
                <button onClick={() => handleDelete(comment.id)}>Supprimer</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SupCom;


