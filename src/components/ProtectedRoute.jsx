import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:3000/api/auth/verify', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.data.valid) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('token');
                    localStorage.removeItem('isAdmin');
                    setIsAuthenticated(false);
                }
            } catch (error) {
                localStorage.removeItem('token');
                localStorage.removeItem('isAdmin');
                setIsAuthenticated(false);
            }
            setIsLoading(false);
        };

        verifyToken();
    }, []);

    if (isLoading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh' 
            }}>
                Chargement...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin" />;
    }

    return children;
};

export default ProtectedRoute; 