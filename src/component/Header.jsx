import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Assurez-vous d'importer jwtDecode

function Header() {
  const token = localStorage.getItem('jwt');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  return (
    <header>
      <h1>LES DESSERTS DE FRANCKY</h1>
      <nav aria-label="Menu principal">
        <div className="logo">
          <Link to="/" aria-label="Retour à l'accueil">
            <img src="/assets/img/logo.png" alt="Logo LES DESSERTS DE FRANCKY" />
          </Link>
        </div>
        <div>
          <ul className="midle_nav" aria-label="Navigation des desserts">
            <li className="barnav">
              <Link to="/desserts/chocolat" aria-label="Desserts au chocolat">Desserts au chocolat</Link>
            </li>
            <li className="barnav">
              <Link to="/desserts/fruits" aria-label="Desserts aux fruits">Desserts aux fruits</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul className="end_nav" aria-label="Options de connexion">
            {!token ? (
              <>
                <li>
                  <Link to="/connexion">
                    <button className="btn_connect" aria-label="Se connecter">Je me connecte</button>
                  </Link>
                </li>
                <li>
                  <Link to="/inscription">
                    <button className="btn_inscrit" aria-label="S'inscrire">Je m'inscris</button>
                  </Link>
                </li>
              </>
            ) : (
              <>
                {jwtDecode(token).role === 1 && (
                  <li>
                    <Link to="/admin">
                      <button className="btn_inscrit" aria-label="Dashboard">Dashboard</button>
                    </Link>
                  </li>
                )}
                <li>
                  <button className="btn_connect" onClick={handleLogout} aria-label="Se déconnecter">Je me déconnecte</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;