import pokemons from '../assets/pokemons';
import '../App.css';
import Carte from '../component/carte/Carte';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function App() {

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  
  // axios connecteur 
  const [pokemonslist, setPokemons] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3000/api/pokemons") // Adresse de ton backend
      .then(response => {
        setPokemons(response.data); // Stocke les données dans le state
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des Pokémon :", error);
      });
  }, []);


  const types = ["all", "Grass", "Fire", "Water", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy", "Rock", "Ground", "Bug", "Poison", "Flying", "Fighting", "Steel", "Ghost", "Normal"];


  // Filtrer les Pokémon en fonction de la barre de recherche
  const filteredPokemons = pokemons.filter(pokemon => pokemon.name.french.toLowerCase().includes(search.toLowerCase()) && (selectedType === "all" || pokemon.type.includes(selectedType))
  );

  /*
    // Fonction pour ajouter un Pokémon
  const addPokemon = (newPokemon) => {
    axios.post("http://localhost:3000/api/pokemons", newPokemon)
      .then(response => {
        setPokemons([...pokemons, response.data]);
      })
      .catch(error => {
        console.error("Erreur lors de l'ajout du Pokémon :", error);
      });
  };
    // Fonction pour mettre à jour un Pokémon
  const updatePokemon = (id, updatedPokemon) => {
    axios.put(`http://localhost:3000/api/pokemons/${id}`, updatedPokemon)
      .then(response => {
        setPokemons(pokemons.map(pokemon => pokemon.id === id ? response.data : pokemon));
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour du Pokémon :", error);
      });
  };
  
*/
  // affichage de la carte
  return (
    <div>
      {/* Barre de recherche */}
      <div className="top-page">
        <h1>Pokédex</h1>
      </div>  
      <div className="search-bar">
        <input type="text"
          placeholder="Rechercher un Pokémon..."
          value={search} onChange={(e) => setSearch(e.target.value)}
        />
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      
      {/* Affichage du Pokédex */}
      <div className="pokedex-container">
        {filteredPokemons.slice(0, 151).map((pokemon, index) => (
          <Carte key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
    
  );
}

export default App;
