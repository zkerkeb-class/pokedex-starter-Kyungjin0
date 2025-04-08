import React, { useState, useEffect } from 'react';
import '../style/Tirage.css';
import DosCarte from '../assets/Décors/DosCarte.webp';
import Booster from '../assets/Décors/Booster.webp';
import Carte from '../component/carte/Carte';

const Tirage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les Pokémon au montage du composant
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pokemons');
        const data = await response.json();
        if (data && data.pokemons) {
          setPokemons(data.pokemons);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des Pokémon:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const drawRandomPokemons = () => {
    if (isDrawing || pokemons.length === 0) return;
    
    setIsDrawing(true);
    setDrawnCards([]);

    // Créer un tableau d'IDs aléatoires uniques
    const randomIds = [];
    while (randomIds.length < 6) {
      const randomId = Math.floor(Math.random() * pokemons.length);
      if (!randomIds.includes(randomId)) {
        randomIds.push(randomId);
      }
    }

    // Récupérer les Pokémon correspondants aux IDs
    const selectedPokemons = randomIds.map(id => pokemons[id]);

    // Révéler les cartes une par une
    selectedPokemons.forEach((pokemon, index) => {
      setTimeout(() => {
        setDrawnCards(prev => [...prev, pokemon]);
        if (index === selectedPokemons.length - 1) {
          setIsDrawing(false);
        }
      }, index * 500);
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des Pokémon...</p>
      </div>
    );
  }

  return (
    <div className="tirage-page">
      <div className="booster-container">
        <img src={Booster} alt="Booster Pack" className="booster-image" />
        <button 
          onClick={drawRandomPokemons}
          className="draw-button"
          disabled={isDrawing}
        >
          {isDrawing ? 'Tirage en cours...' : 'Ouvrir le booster'}
        </button>
      </div>

      <div className="cards-container">
        {Array(6).fill(null).map((_, index) => (
          <div key={index} className="card-wrapper">
            {drawnCards[index] ? (
              <Carte pokemon={drawnCards[index]} />
            ) : (
              <div className="card">
                <div className="card-inner">
                  <div className="card-front">
                    <img src={DosCarte} alt="Dos de carte" className="card-back-image" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tirage; 