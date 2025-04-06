import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';

const Home = () => {
  return (
    <div className="page-container">
      <h1 className="home-title">Bienvenue sur le Pokédex</h1>
      <div className="links-container">
        <Link to="/pokedex" className="home-link">
          Pokédex
        </Link>
        <Link to="/comparateur" className="home-link">
          Comparateur
        </Link>
        <Link to="/duel" className="home-link">
          Arène de Combat
        </Link>
        <Link to="/admin" className="home-link">
          Administration
        </Link>
      </div>
    </div>
  );
};

export default Home;