import HomePage from './page/HomePage';
import './Nav.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import FormInscription from './page/FormInscription';
import FormConnexion from './page/FormConnexion';
import Chocolat from './page/Chocolat';
import Fruit from './page/Fruit';
import DescriptionPage from './page/DescriptionPage';

function App() {
  return (
    // BrowserRouter permet de creer des liens(chemins) url
    <BrowserRouter>    
      <Routes>
        <Route path="/inscription" element={<FormInscription/>} />
        <Route path="/" element={<HomePage />} />
        <Route path="/connexion" element={<FormConnexion/>} />
        <Route path="/desserts/chocolat" element={<Chocolat/>} />
        <Route path="/desserts/fruits" element={<Fruit/>} />
        <Route path="/description/:id" element={<DescriptionPage/>} />


       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

