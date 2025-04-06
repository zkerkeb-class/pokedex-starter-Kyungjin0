import React, { useState, useEffect } from "react";
import axios from "axios";
import '../style/Comparateur.css';

const API_URL = "http://localhost:3000/api/pokemons";

const Comparateur = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState(null);
  const [selectedPokemon2, setSelectedPokemon2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data && response.data.pokemons) {
        setPokemons(response.data.pokemons);
        setError(null);
      } else {
        setError("Format de données invalide");
      }
    } catch (error) {
      setError("Erreur lors du chargement des Pokémon");
    } finally {
      setLoading(false);
    }
  };

  const compareStats = (stat1, stat2) => {
    if (stat1 > stat2) return "higher";
    if (stat1 < stat2) return "lower";
    return "equal";
  };

  const handlePokemonSelect = (pokemon, isFirst) => {
    if (isFirst) {
      setSelectedPokemon1(pokemon);
    } else {
      setSelectedPokemon2(pokemon);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des Pokémon...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={loadPokemons} className="retry-button">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="comparateur-page">
      <div className="comparateur-container">
        <div className="comparateur-pokemon-selection">
          <div className="comparateur-selection-box">
            <h2>Premier Pokémon</h2>
            <div className="comparateur-pokemon-grid">
              {pokemons.map(pokemon => (
                <div
                  key={pokemon.id}
                  className={`comparateur-pokemon-option ${selectedPokemon1?.id === pokemon.id ? 'selected' : ''}`}
                  onClick={() => handlePokemonSelect(pokemon, true)}
                >
                  <img src={pokemon.image} alt={pokemon.name.french} />
                </div>
              ))}
            </div>
          </div>

          <div className="comparateur-selection-box">
            <h2>Deuxième Pokémon</h2>
            <div className="comparateur-pokemon-grid">
              {pokemons.map(pokemon => (
                <div
                  key={pokemon.id}
                  className={`comparateur-pokemon-option ${selectedPokemon2?.id === pokemon.id ? 'selected' : ''}`}
                  onClick={() => handlePokemonSelect(pokemon, false)}
                >
                  <img src={pokemon.image} alt={pokemon.name.french} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedPokemon1 && selectedPokemon2 && (
          <div className="comparateur-comparison-container">
            <div className="comparateur-balance-cards">
              <div className="comparateur-pokemon-card">
                <h2>{selectedPokemon1.name.french}</h2>
                <img src={selectedPokemon1.image} alt={selectedPokemon1.name.french} />
                <div className="comparateur-stats-container">
                  <div className={`comparateur-stat ${compareStats(selectedPokemon1.base.HP, selectedPokemon2.base.HP)}`}>
                    <span>HP: {selectedPokemon1.base.HP}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon1.base.Attack, selectedPokemon2.base.Attack)}`}>
                    <span>Attack: {selectedPokemon1.base.Attack}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon1.base.Defense, selectedPokemon2.base.Defense)}`}>
                    <span>Defense: {selectedPokemon1.base.Defense}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon1.base.SpAttack, selectedPokemon2.base.SpAttack)}`}>
                    <span>Sp. Attack: {selectedPokemon1.base.SpAttack}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon1.base.SpDefense, selectedPokemon2.base.SpDefense)}`}>
                    <span>Sp. Defense: {selectedPokemon1.base.SpDefense}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon1.base.Speed, selectedPokemon2.base.Speed)}`}>
                    <span>Speed: {selectedPokemon1.base.Speed}</span>
                  </div>
                </div>
              </div>

              <div className="comparateur-pokemon-card">
                <h2>{selectedPokemon2.name.french}</h2>
                <img src={selectedPokemon2.image} alt={selectedPokemon2.name.french} />
                <div className="comparateur-stats-container">
                  <div className={`comparateur-stat ${compareStats(selectedPokemon2.base.HP, selectedPokemon1.base.HP)}`}>
                    <span>HP: {selectedPokemon2.base.HP}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon2.base.Attack, selectedPokemon1.base.Attack)}`}>
                    <span>Attack: {selectedPokemon2.base.Attack}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon2.base.Defense, selectedPokemon1.base.Defense)}`}>
                    <span>Defense: {selectedPokemon2.base.Defense}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon2.base.SpAttack, selectedPokemon1.base.SpAttack)}`}>
                    <span>Sp. Attack: {selectedPokemon2.base.SpAttack}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon2.base.SpDefense, selectedPokemon1.base.SpDefense)}`}>
                    <span>Sp. Defense: {selectedPokemon2.base.SpDefense}</span>
                  </div>
                  <div className={`comparateur-stat ${compareStats(selectedPokemon2.base.Speed, selectedPokemon1.base.Speed)}`}>
                    <span>Speed: {selectedPokemon2.base.Speed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparateur; 