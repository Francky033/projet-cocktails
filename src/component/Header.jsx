import { Link } from "react-router-dom";

function Header() {
    return (
<header>
      <nav>
        <div className="logo">
          <Link to= "/"><img src="/assets/img/logo.png" alt="logo" /></Link>
        </div>
        <div>
          <ul className="midle_nav">
            <li className="barnav"><Link to="/desserts/chocolat">Desserts au chocolat</Link></li>
            <li className="barnav"><Link to="/desserts/fruits">Desserts aux fruits</Link></li>
          </ul>
        </div>
        <div>
          <ul className="end_nav">
          <li><Link to= "/connexion"><button className="btn_connect">Je me connecte</button></Link></li>
          <li><Link to= "/inscription"><button className="btn_inscrit">Je m'inscris</button></Link></li>
        </ul>
        </div>
        
      </nav>
    </header>
    );
}

export default Header