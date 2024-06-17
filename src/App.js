import React from 'react';
import HomePage from './page/HomePage';
import './Nav.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormInscription from './page/FormInscription';
import FormConnexion from './page/FormConnexion';
import Chocolat from './page/Chocolat';
import Fruit from './page/Fruit';
import DescriptionPage from './page/DescriptionPage';
import DashboardPage from './page/admin/Dashboardadmin';
import AjoutDessert from "./page/admin/AjoutDessert";
import SupCom from "./page/admin/SupCom";
import SupUser from "./page/admin/SupUser";
import ModifierDessert from "./page/admin/ModifierDessert";
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inscription" element={<FormInscription />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/connexion" element={<FormConnexion />} />
        <Route path="/desserts/chocolat" element={<Chocolat />} />
        <Route path="/desserts/fruits" element={<Fruit />} />
        <Route path="/description/:id" element={<DescriptionPage />} />
        
        {/* Routes protégées */}
        <Route path="/admin" element={
          <PrivateRoute requiredRole={1}>
            <DashboardPage />
          </PrivateRoute>
        } />
        <Route path="/ajout" element={
          <PrivateRoute requiredRole={1}>
            <AjoutDessert />
          </PrivateRoute>
        } />
        <Route path="/commentaire" element={
          <PrivateRoute requiredRole={1}>
            <SupCom />
          </PrivateRoute>
        } />
        <Route path="/utilisateur" element={
          <PrivateRoute requiredRole={1}>
            <SupUser />
          </PrivateRoute>
        } />
        <Route path="/recette" element={
          <PrivateRoute requiredRole={1}>
            <ModifierDessert />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


