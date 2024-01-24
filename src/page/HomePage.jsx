import Footer from "../component/Footer";
import Header from "../component/Header"
import "./HomePage.css"
//import { Link } from "react-router-dom";


function HomePage() {

    // la function '.sort' permet de comparer 2 élements
    // la function '.map' permet de faire une boucle
    return (
        <>
        <Header/>
       <main>
              <h2>Top desserts au chocolat</h2>
        <section className="top">
            <div>
              <h4>Nom dessert</h4>
              <img className="img_HP" src="https://kinsta.com/fr/wp-content/uploads/sites/4/2020/09/jpeg.jpg" alt="teste" />
              <p>Description</p>
            </div>
            <div>
              <h4>Nom dessert</h4>
              <img className="img_HP" src="https://kinsta.com/fr/wp-content/uploads/sites/4/2020/09/jpeg.jpg" alt="teste" />
              <p>Description</p>
            </div>
            <div>
              <h4>Nom dessert</h4>
              <img className="img_HP" src="https://kinsta.com/fr/wp-content/uploads/sites/4/2020/09/jpeg.jpg" alt="teste" />
              <p>Description</p>
            </div>
          </section>

              <h2>Top desserts aux fruits</h2>
          <section>
            <div>
              <h4>Nom dessert</h4>
              <img className="img_HP" src="/assets/img/logo.png" alt="teste" />
              <p>Description</p>
            </div>
            <div>
              <h4>Nom dessert</h4>
              <img className="img_HP" src="/assets/img/logo.png" alt="teste" />
              <p>Description</p>
            </div>
            <div>
              <h4>Nom dessert</h4>
              <img className="img_HP" src="/assets/img/logo.png" alt="teste" />
              <p>Description</p>
            </div>
          </section>
       </main>
     <Footer/>
       </>
    )
}

export default HomePage