import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carte from '../component/carte/Carte';
import '../style/Pokedex.css';

const API_URL = "http://localhost:3000/api/pokemons";


const Pokedex = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = async () => {
    try {
      setLoading(true);
      console.log("Tentative de chargement des Pokémon...");
      const response = await axios.get(API_URL);
      console.log("Réponse reçue:", response.data);
      
      if (response.data && response.data.pokemons) {
        setPokemons(response.data.pokemons);
        console.log(`${response.data.pokemons.length} Pokémon chargés`);
        setError(null);
      } else {
        console.error("Format de réponse invalide:", response.data);
        setError("Format de données invalide");
      }
    } catch (error) {
      console.error("Erreur détaillée:", error);
      if (error.response) {
        console.error("Réponse d'erreur:", error.response.data);
        setError(`Erreur: ${error.response.data.error || "Erreur lors du chargement des Pokémon"}`);
      } else if (error.request) {
        console.error("Pas de réponse reçue");
        setError("Impossible de joindre le serveur. Vérifiez que le serveur est en cours d'exécution.");
      } else {
        console.error("Erreur de configuration:", error.message);
        setError("Erreur de configuration");
      }
    } finally {
      setLoading(false);
    }
  };

  const types = ["all", "Grass", "Fire", "Water", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy", "Rock", "Ground", "Bug", "Poison", "Flying", "Fighting", "Steel", "Ghost", "Normal"];

  const filteredPokemons = pokemons.filter(pokemon => 
    pokemon.name.french.toLowerCase().includes(search.toLowerCase()) && 
    (selectedType === "all" || pokemon.type.includes(selectedType))
  );

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
    <div className="pokedex-page">
      <div className="top-page">
        <h1>Pokédex</h1>
      </div>  
      
      <div className="search-bar">
        <input 
          type="text"
          placeholder="Rechercher un Pokémon..."
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      <div className="pokedex-container">
        {filteredPokemons.map((pokemon) => (
          <Carte key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {filteredPokemons.length === 0 && (
        <div className="no-results">
          <p>Aucun Pokémon trouvé</p>
        </div>
      )}
    </div>
  );
};

export default Pokedex;