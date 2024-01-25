import { useEffect, useState } from "react";
import Footer from "../component/Footer";
import Header from "../component/Header"
import "./Chocolat.css"
import { Link } from "react-router-dom";


function Chocolat() {


const [chocolat, setChocolat] = useState([])
  useEffect(()=>{
    (async()=>{
        const responseOfFetch = await fetch(`http://localhost:3003/api/dessert`)
        const responseToJson = await responseOfFetch.json()

          setChocolat(
            responseToJson.filter(response => response.categorie === 'chocolat')
          )

          ;
    })()
  },[])
  return (
    <>
      <Header />
      <main>
        <h2>Desserts au chocolat</h2>
        <section className="top2">
          {chocolat.map((chocolat) => (
            <div key={chocolat.id}>
              <h4>{chocolat.nom}</h4>
              <Link to={`/description/${chocolat.id}`}><img className="img_choco" src={chocolat.image} alt={chocolat.nom} /></Link>
              <p>{chocolat.description}</p>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Chocolat;