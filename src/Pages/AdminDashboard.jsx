import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Admin.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Tableau de bord administrateur</h1>
        <button onClick={handleLogout} className="logout-button">Déconnexion</button>
      </header>
      
      <div className="dashboard-welcome">
        <h2>Bienvenue dans l'interface d'administration</h2>
        <p>Utilisez la barre de navigation en haut pour accéder aux différentes sections :</p>
        <ul>
          <li>Gestionnaire : Gérer les Pokémon</li>
          <li>Pokédex : Consulter la liste complète</li>
          <li>Comparateur : Comparer les statistiques</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard; 