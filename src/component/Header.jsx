import { Link } from "react-router-dom";

function Header() {
    return (
<header>
      <h1>Cocktails</h1>
      <nav>
        <ul>
          <Link to= "/"><button>Home</button></Link>
          <Link to= "/cocktails"><button>Cocktails</button></Link>
          <Link to= "/random/cocktails"><button>Random Cocktails</button></Link>
        </ul>
      </nav>
    </header>
    );
}

export default Header