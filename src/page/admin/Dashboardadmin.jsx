import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../component/Header";
import AjoutDessert from "../admin/AjoutDessert";


function DashboardPage() {
  return (
    <>
      <Header />
      <main>
        <h2>Tableau de Bord</h2>
        <div>
          <ul className="end_nav" aria-label="Options de connexion">
              <>
                <li>
                  <Link to="/ajout">
                    <button className="btn_connect" aria-label="Ajoutez">Ajout nouvelle recette</button>
                  </Link>
                </li>
                <li>
                  <Link to="/inscription">
                    <button className="btn_inscrit" aria-label="S'inscrire">Je m'inscris</button>
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
