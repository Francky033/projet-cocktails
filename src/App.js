import HomePage from './page/HomePage';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CocktailsPage from './page/CocktailsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cocktails" element={<CocktailsPage/>} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;

