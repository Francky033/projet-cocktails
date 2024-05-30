import { useEffect, useState } from "react";
import Header from "../../component/Header";
import { Link } from "react-router-dom";

function DashboardPage() {
  const [chocolat, setChocolat] = useState([]);
  const [fruit, setFruit] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const responseOfFetch = await fetch(`http://localhost:3003/api/dessert`);
        const responseToJson = await responseOfFetch.json();
        setChocolat(responseToJson.filter(response => response.categorie === 'chocolat'));
        setFruit(responseToJson.filter(response => response.categorie === 'fruit'));
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <h1>Dashboard</h1>
        <section>
          <h2>Gestion des Desserts</h2>
          <div className="dessert-management">
            {function AddDessertForm({ onNewDessert }) {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [categorie, setCategorie] = useState('chocolat'); // 'chocolat' est la valeur par défaut
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dessert = { nom, description, categorie, image };
      const response = await fetch('http://localhost:3003/api/dessert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dessert),
      });
      if (response.ok) {
        const addedDessert = await response.json();
        onNewDessert(addedDessert);
        setNom('');
        setDescription('');
        setCategorie('chocolat');
        setImage('');
      } else {
        console.error('Erreur lors de l\'ajout du dessert');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ajouter un nouveau dessert</h2>
      <div>
        <label htmlFor="nom">Nom:</label>
        <input
          type="text"
          id="nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="categorie">Catégorie:</label>
        <select
          id="categorie"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
          required
        >
          <option value="chocolat">Chocolat</option>
          <option value="fruit">Fruit</option>
        </select>
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <button type="submit">Ajouter</button>
    </form>
  );
}

}
          </div>
        </section>
      </main>
    </>
  );
}

export default DashboardPage;
