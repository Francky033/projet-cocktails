import { Link } from "react-router-dom";

function Header() {
    return (
<header>
      <h1>Cocktails</h1>
      <nav>
        <ul>
          <li><Link to= "/"><button>Home</button></Link></li>
          <li><Link to= "/cocktails"><button>Cocktails</button></Link></li>
           
        </ul>
      </nav>
    </header>
    );
}

export default Header