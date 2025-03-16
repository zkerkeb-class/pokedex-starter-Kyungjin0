import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Carte from '../component/carte/Carte';
import '../App.css';

const API_URL = "http://localhost:3000/api/pokemons";

const Pokedex = () => {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        console.log("Réponse de l'API :", response.data); 
        setPokemons(response.data.pokemons); // Accéder à la clé `pokemons`
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      });
  }, []);

  const types = ["all", "Grass", "Fire", "Water", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy", "Rock", "Ground", "Bug", "Poison", "Flying", "Fighting", "Steel", "Ghost", "Normal"];

  const filteredPokemons = pokemons.filter(pokemon => 
    pokemon.name.french.toLowerCase().includes(search.toLowerCase()) && 
    (selectedType === "all" || pokemon.type.includes(selectedType))
  );


  // variable pour afficher les 151 premiers pokémons par défaut
  const [displayCount, setDisplayCount] = useState(152);

  return (
    <div>
      <div className="top-page">
        <Link to="/">
          <button className="back-button">Retour à l'accueil</button>
        </Link>
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
        {filteredPokemons.slice(0, displayCount).map((pokemon, index) => (
          <Carte key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Pokedex;