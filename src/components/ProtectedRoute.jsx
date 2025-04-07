import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    // Si pas de token, rediriger vers la page de connexion
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Si l'utilisateur n'est pas admin, rediriger vers la page d'accueil
    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    // Si l'utilisateur est authentifié et est admin, afficher le contenu protégé
    return children;
};

export default ProtectedRoute; 