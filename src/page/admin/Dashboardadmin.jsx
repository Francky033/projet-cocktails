import React from "react";
import {Link} from "react-router-dom";
import Header from "../../component/Header";
import "./DashboardAdmin.css";


function DashboardPage() {
  return (
    <>
      <Header />
      <main>
        <h2>Tableau de Bord</h2>
        <div>
          <ul className="end_nav dash" aria-label="Options dashboard">
              <>
                <li>
                  <Link to="/ajout">
                    <button className="btn_connect" aria-label="Ajoutez">Ajout nouvelle recette</button>
                  </Link>
                </li>
                <li>
                  <Link to="/commentaire">
                    <button className="btn_inscrit" aria-label="Modifier/Supprimer">Modifier/Supprimer commentaires</button>
                  </Link>
                </li>
                <li>
                  <Link to="/utilisateur">
                    <button className="btn_connect" aria-label="Utilisateur">Supprimer Utilisateurs</button>
                  </Link>
                </li>
                <li>
                  <Link to="/recette">
                    <button className="btn_inscrit" aria-label="Recette">Modifier/Supprimer Recettes</button>
                  </Link>
                </li>
              </>
          </ul>
        </div>

      </main>
    </>
  );
}

export default DashboardPage;
