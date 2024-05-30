import { useEffect, useState } from "react";
//import Footer from "../component/Footer";
import Header from "../component/Header";
import "./HomePage.css";
import { Link } from "react-router-dom";

function HomePage() {
  const [chocolat, setChocolat] = useState([]);
  const [fruit, setFruit] = useState([]);

  useEffect(() => {
    (async () => {
      const responseOfFetch = await fetch(`http://localhost:3003/api/dessert`);
      const responseToJson = await responseOfFetch.json();

      setChocolat(
        responseToJson.filter(response => response.categorie === 'chocolat')
      );

      setFruit(
        responseToJson.filter(response => response.categorie === 'fruit')
      );
    })();
  }, []);

  console.log(chocolat, 'choco');

  return (
    <>
      <Header />
      <main>
        <h2>Desserts au chocolat les plus récents</h2>
        <section className="top">
          {chocolat && chocolat.length > 0 && (
            <>
              {chocolat.slice(-3).reverse().map((choco, index) => (
                <div className="dessertbox" key={index}>
                  <Link to={`/description/${choco.id}`}>
                    <h4>{choco.nom}</h4>
                    <img className="img_HP" src={choco.image} alt={choco.nom} />
                  </Link>
                  <p>{choco.description}</p>
                </div>
              ))}
            </>
          )}
        </section>

        <h2>Desserts aux fruits les plus récents</h2>
        <section>
          {fruit && fruit.length > 0 && (
            <>
              {fruit.slice(-3).reverse().map((fr, index) => (
                <div className="dessertbox" key={index}>
                  <Link to={`/description/${fr.id}`}>
                    <h4>{fr.nom}</h4>
                    <img className="img_HP" src={fr.image} alt={fr.nom} />
                  </Link>
                  <p>{fr.description}</p>
                </div>
              ))}
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default HomePage;
