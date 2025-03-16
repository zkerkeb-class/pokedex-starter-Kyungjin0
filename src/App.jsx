import pokemons from './assets/pokemons';
import './App.css';
import Carte from './component/carte/Carte';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Pokedex from './Pages/Pokedex';
import Gestionnaire from './Pages/Gestionnaire';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/gestionnaire" element={<Gestionnaire />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;