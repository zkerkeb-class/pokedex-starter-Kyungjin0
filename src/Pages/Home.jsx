import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../App.css';


function Home() {
  return (
    <div className="Home">
      <h1>Home</h1>
      <div className='links'>
        <Link to="/pokedex">View</Link>
        <Link to="/gestionnaire">Gestionnaire</Link>
      </div>
    </div>
  );
}

export default Home;