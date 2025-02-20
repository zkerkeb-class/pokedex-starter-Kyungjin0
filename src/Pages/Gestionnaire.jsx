import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:3000/api/pokemons";

const Gestionnaire = () => {
  const [pokemons, setPokemons] = useState([]);
  const [newPokemon, setNewPokemon] = useState({ name: "", type: "" });
  const [editPokemon, setEditPokemon] = useState({ id: "", name: "", type: "" });

  // 🔥 Charger les Pokémon depuis le backend
  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = () => {
    axios.get(API_URL)
      .then(response => setPokemons(response.data))
      .catch(error => console.error("Erreur :", error));
  };

  // 🟢 Ajouter un Pokémon
  const addPokemon = (e) => {
    e.preventDefault();
    axios.post(API_URL, { id: Date.now(), name: { french: newPokemon.name }, type: newPokemon.type.split(",") })
      .then(() => {
        loadPokemons();
        setNewPokemon({ name: "", type: "" });
      })
      .catch(error => console.error("Erreur d'ajout :", error));
  };

  // 🟡 Modifier un Pokémon (remplacement complet)
  const updatePokemon = (e) => {
    e.preventDefault();
    axios.put(`${API_URL}/${editPokemon.id}`, { id: editPokemon.id, name: { french: editPokemon.name }, type: editPokemon.type.split(",") })
      .then(() => {
        loadPokemons();
        setEditPokemon({ id: "", name: "", type: "" });
      })
      .catch(error => console.error("Erreur de modification :", error));
  };

  // 🔴 Supprimer un Pokémon
  const deletePokemon = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => loadPokemons())
      .catch(error => console.error("Erreur de suppression :", error));
  };

  return (
    <div>
      <h1>Gestion des Pokémon</h1>
      <Link to="/"><button>Retour au Pokédex</button></Link> {/* 🔗 Lien retour */}

      {/* Formulaire d'ajout */}
      <h2>Ajouter un Pokémon</h2>
      <form onSubmit={addPokemon}>
        <input type="text" placeholder="Nom" value={newPokemon.name} onChange={(e) => setNewPokemon({ ...newPokemon, name: e.target.value })} required />
        <input type="text" placeholder="Type (séparé par des virgules)" value={newPokemon.type} onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })} required />
        <button type="submit">Ajouter</button>
      </form>

      {/* Formulaire de modification */}
      <h2>Modifier un Pokémon</h2>
      <form onSubmit={updatePokemon}>
        <input type="text" placeholder="ID" value={editPokemon.id} onChange={(e) => setEditPokemon({ ...editPokemon, id: e.target.value })} required />
        <input type="text" placeholder="Nouveau Nom" value={editPokemon.name} onChange={(e) => setEditPokemon({ ...editPokemon, name: e.target.value })} required />
        <input type="text" placeholder="Nouveau Type" value={editPokemon.type} onChange={(e) => setEditPokemon({ ...editPokemon, type: e.target.value })} required />
        <button type="submit">Modifier</button>
      </form>

      {/* Liste des Pokémon avec suppression */}
      <h2>Liste des Pokémon</h2>
      <ul>
        {pokemons.map(pokemon => (
          <li key={pokemon.id}>
            {pokemon.id}: {pokemon.name.french} - Type : {pokemon.type.join(", ")}
            <button onClick={() => deletePokemon(pokemon.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gestionnaire;
