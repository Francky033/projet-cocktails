import HomePage from './page/HomePage';
import './Nav.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CocktailsPage from './page/DescriptionPage'
import DrinksPage from './page/DrinksPage';
import FormInscription from './page/FormInscription';
import FormConnexion from './page/FormConnexion';
import Chocolat from './page/Chocolat';
import Fruit from './page/Fruit';

function App() {
  return (
    // BrowserRouter permet de creer des liens(chemins) url
    <BrowserRouter>    
      <Routes>
        <Route path="/inscription" element={<FormInscription/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/cocktails" element={<CocktailsPage/>} />
        <Route path="/connexion" element={<FormConnexion/>} />
        <Route path="/drinks" element={<DrinksPage/>} />
        <Route path="/desserts/chocolat" element={<Chocolat/>} />
        <Route path="/desserts/fruits" element={<Fruit/>} />


       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

