import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './Pages/Home';
import Pokedex from './Pages/Pokedex';
import Gestionnaire from './Pages/Gestionnaire';
import Comparateur from './Pages/Comparateur';
import AdminLogin from './Pages/AdminLogin';
import Duel from './Pages/Duel';
import Login from './Pages/Login';
import Register from './Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Tirage from './Pages/Tirage';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Page d'accueil sans Navbar */}
        <Route path="/" element={<Home />} />

        {/* Routes d'authentification avec Navbar */}
        <Route path="/login" element={
          <>
            <Navbar />
            <Login />
          </>
        } />

        <Route path="/register" element={
          <>
            <Navbar />
            <Register />
          </>
        } />

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

        <Route path="/tirage" element={
          <>
            <Navbar />
            <Tirage />
          </>
        } />

        <Route path="/admin" element={
          <>
            <Navbar />
            <div style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '60px' }}>
              <AdminLogin />
            </div>
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
