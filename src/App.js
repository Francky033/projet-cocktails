import HomePage from './page/HomePage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CocktailsPage from './page/CocktailsPage'
import RandomCocktailPage from './page/RandomCocktailPage';

function App() {
  return (
    // BrowserRouter permet de creer des liens(chemins) url
    <BrowserRouter>    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cocktails" element={<CocktailsPage/>} />
        <Route path="/random/cocktails" element={<RandomCocktailPage/>} />

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

