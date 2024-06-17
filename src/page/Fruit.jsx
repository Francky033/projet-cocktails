import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header"
import "./Fruit.css"
import { Link } from "react-router-dom";


function Fruit() {


  const [fruit, setFruit] = useState([])
    useEffect(()=>{
      (async()=>{
          const responseOfFetch = await fetch(`http://localhost:3003/api/desserts`)
          const responseToJson = await responseOfFetch.json()
  
            setFruit(
              responseToJson.filter(response => response.categorie === 'fruit')
            )
  
            ;
      })()
    },[])
    return (
      <>
        <Header />
        <main>
          <h2>Desserts au fruit</h2>
          <section className="top2">
            {fruit.map((fruit) => (
              <div key={fruit.id}>
                <h4>{fruit.nom}</h4>
                <Link to={`/description/${fruit.id}`}><img className="img_choco" src={fruit.image} alt={fruit.nom} /></Link>
                <p>{fruit.description}</p>
              </div>
            ))}
          </section>
        </main>
        <Footer />
      </>
    );
  }
  
  export default Fruit;