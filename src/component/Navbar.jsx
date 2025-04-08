import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../style/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  // Récupération sécurisée des données utilisateur
  let user = null;
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user = JSON.parse(userData);
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données utilisateur:', error);
  }

  // Masquer la navbar uniquement sur la page Home
  if (location.pathname === '/') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <div className="nav-main-links">
          <Link to="/pokedex" className="nav-link">Pokédex</Link>
          <Link to="/comparateur" className="nav-link">Comparateur</Link>
          <Link to="/duel" className="nav-link">Arène de Combat</Link>
          <Link to="/tirage" className="nav-link">Tirage</Link>
          {isAdmin && (
            <Link to="/gestionnaire" className="nav-link">Gestionnaire</Link>
          )}
        </div>
        
        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="user-section">
              <span className="username">{isAdmin ? 'Admin' : (user?.username || 'Utilisateur')}</span>
              <button onClick={handleLogout} className="logout-button">
                Déconnexion
              </button>
            </div>
          ) : (
            <>
              <Link to="/admin" className="nav-link">Administration</Link>
              {location.pathname !== '/login' && (
                <Link to="/login" className="nav-link login-button">Connexion</Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;