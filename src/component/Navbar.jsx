import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  // Masquer la navbar sur la page Home
  if (location.pathname === '/') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/pokedex" className="nav-link">Pokédex</Link>
        <Link to="/comparateur" className="nav-link">Comparateur</Link>
        <Link to="/duel" className="nav-link">Arène de Combat</Link>
        {isAuthenticated ? (
          <>
            <Link to="/gestionnaire" className="nav-link">Gestionnaire</Link>
            <button onClick={handleLogout} className="nav-link logout-button">
              Se déconnecter
            </button>
          </>
        ) : (
          <Link to="/admin" className="nav-link">Administration</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;