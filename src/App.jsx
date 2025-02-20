import pokemons from './assets/pokemons';
import './App.css';
import Carte from './component/carte/Carte';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Pokedex from './Pages/Pokedex';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="Home">
      <h1>Welcome to the Pokedex</h1>
      <p>Click the link below to view the Pokedex:</p>
      <Link to="/pokedex">Go to Pokedex</Link>
    </div>
  );
}

export default App;