import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header"
import "./HomePage.css"
import { Link } from "react-router-dom";



function HomePage() {

const [dessert, setDessert] = useState(null)
const [chocolat, setChocolat] = useState([])
const [fruit, setFruit] = useState([])
  useEffect(()=>{
    (async()=>{
        const responseOfFetch = await fetch(`http://localhost:3003/api/dessert`)
        const responseToJson = await responseOfFetch.json()

          setChocolat(
            responseToJson.filter(response => response.categorie === 'chocolat')
          )

          setFruit(
            responseToJson.filter(response => response.categorie === 'fruit')
            )
          
          
        
          setDessert();
    })()
  },[])
  console.log(chocolat, 'choco');

    return (
        <>
        <Header/>
       <main>
              <h2>Desserts au chocolat les plus récents</h2>
        <section className="top">

          {
            chocolat && chocolat.length >0 && (
              <>
              <div className="dessertbox">
                <Link to={`/description/${chocolat[chocolat.length-1].id}`}>
                  <h4>{chocolat[chocolat.length-1].nom}</h4>
              <img className="img_HP" src={chocolat[chocolat.length-1].image} alt="teste" /></Link>
              
              <p>{chocolat[chocolat.length-1].description}</p>
            </div>
            <div className="dessertbox">
                <Link to={`/description/${chocolat[chocolat.length-2].id}`}>
                  <h4>{chocolat[chocolat.length-1].nom}</h4>
              <img className="img_HP" src={chocolat[chocolat.length-2].image} alt="teste" /></Link>
              
              <p>{chocolat[chocolat.length-2].description}</p>
            </div>
            <div className="dessertbox">
                <Link to={`/description/${chocolat[chocolat.length-3].id}`}>
                  <h4>{chocolat[chocolat.length-3].nom}</h4>
              <img className="img_HP" src={chocolat[chocolat.length-3].image} alt="teste" /></Link>
              
              <p>{chocolat[chocolat.length-3].description}</p>
            </div>
            </>
            )
          }

          </section>

              <h2>Desserts aux fruits les plus récents</h2>
          <section>
            
          {
            fruit && fruit.length >0 && (
              <>
              <div className="dessertbox">
              <Link to={`/description/${fruit[fruit.length-1].id}`}>
                  <h4>{fruit[fruit.length-1].nom}</h4>
              <img className="img_HP" src={fruit[fruit.length-1].image} alt="teste" /></Link>
              
              <p>{fruit[fruit.length-1].description}</p>
            </div>
            <div className="dessertbox">
            <Link to={`/description/${fruit[fruit.length-2].id}`}>
                  <h4>{fruit[fruit.length-2].nom}</h4>
              <img className="img_HP" src={fruit[fruit.length-2].image} alt="teste" /></Link>
              
              <p>{fruit[fruit.length-2].description}</p>
            </div>
            <div className="dessertbox">
            <Link to={`/description/${fruit[fruit.length-3].id}`}>
                  <h4>{fruit[fruit.length-3].nom}</h4>
              <img className="img_HP" src={fruit[fruit.length-3].image} alt="teste" /></Link>
              
              <p>{fruit[fruit.length-3].description}</p>
            </div>
            </>
            )
          }
          </section>
       </main>

       </>
    )
}

export default HomePage