import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './Pages/Home';
import Pokedex from './Pages/Pokedex';
import Gestionnaire from './Pages/Gestionnaire';
import Comparateur from './Pages/Comparateur';
import AdminLogin from './Pages/AdminLogin';
import Duel from './Pages/Duel';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil sans Navbar */}
        <Route path="/" element={<Home />} />

        {/* Routes avec Navbar */}
        <Route path="/pokedex" element={
          <>
            <Navbar />
            <Pokedex />
          </>
        } />
        
        <Route path="/comparateur" element={
          <>
            <Navbar />
            <Comparateur />
          </>
        } />

        <Route path="/duel" element={
          <>
            <Navbar />
            <Duel />
          </>
        } />

        <Route path="/admin" element={
          <>
            <Navbar />
            <AdminLogin />
          </>
        } />

        {/* Route protégée - Gestionnaire */}
        <Route path="/gestionnaire" element={
          <ProtectedRoute>
            <Navbar />
            <Gestionnaire />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
