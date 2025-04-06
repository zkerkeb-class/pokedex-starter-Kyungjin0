import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password
            });

            if (response.data.token) {
                // Stockage du token
                localStorage.setItem('token', response.data.token);
                // Stockage de l'état de connexion
                localStorage.setItem('isAdmin', 'true');
                // Redirection vers le gestionnaire
                navigate('/gestionnaire');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur de connexion');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="login-box">
                <h2>Connexion Administrateur</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nom d'utilisateur:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Mot de passe:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin; 