import Header from "../component/Header"
import { Link } from "react-router-dom";


function HomePage() {

    // la function '.sort' permet de comparer 2 élements
    // la function '.map' permet de faire une boucle
    return (
        <>
        <Header/>
       <main>
        <section>
            
          <h2>Cocktails</h2>

          <Link to= "/cocktails"><button>Cocktails</button></Link>



        </section>
       </main>
     
       </>
    )
}

export default HomePage