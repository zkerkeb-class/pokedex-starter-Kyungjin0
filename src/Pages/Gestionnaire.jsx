import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../style/Gestionnaire.css'; 

const API_URL = "http://localhost:3000/api/pokemons";

const Gestionnaire = () => {
  const [pokemons, setPokemons] = useState([]);
  const [newPokemon, setNewPokemon] = useState({ name: { french: "", english: "" }, type: "", base: { HP: "", Attack: "", Defense: "", "Sp. Attack": "", "Sp. Defense": "", Speed: "" }, image: null });
  const [editPokemon, setEditPokemon] = useState({ id: "", name: { french: "", english: "" }, type: "", base: { HP: "", Attack: "", Defense: "", "Sp. Attack": "", "Sp. Defense": "", Speed: "" }, image: null });

  useEffect(() => {
    loadPokemons();
  }, []);

  const loadPokemons = () => {
    axios.get(API_URL)
      .then(response => {
        console.log("Réponse de l'API :", response.data); 
        setPokemons(response.data.pokemons); // Accéder à la clé `pokemons`
      })
      .catch(error => console.error("Erreur :", error));
  };

  const handleImageUpload = (e, setPokemon) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPokemon(prevState => ({ ...prevState, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addPokemon = (e) => {
    e.preventDefault();
    if (newPokemon.name.french && newPokemon.name.english && newPokemon.type) {
      const maxId = pokemons.length > 0 ? Math.max(...pokemons.map(pokemon => pokemon.id)) : 124;
      const newId = maxId + 1;
      axios.post(API_URL, { id: newId, name: newPokemon.name, type: newPokemon.type.split(","), base: newPokemon.base, image: newPokemon.image })
        .then(() => {
          loadPokemons();
          setNewPokemon({ name: { french: "", english: "" }, type: "", base: { HP: "", Attack: "", Defense: "", "Sp. Attack": "", "Sp. Defense": "", Speed: "" }, image: null });
        })
        .catch(error => console.error("Erreur d'ajout :", error));
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const updatePokemon = (e) => {
    e.preventDefault();
    if (editPokemon.id && editPokemon.name.french && editPokemon.name.english && editPokemon.type) {
      axios.put(`${API_URL}/${editPokemon.id}`, { id: editPokemon.id, name: editPokemon.name, type: editPokemon.type.split(","), base: editPokemon.base, image: editPokemon.image })
        .then(() => {
          loadPokemons();
          setEditPokemon({ id: "", name: { french: "", english: "" }, type: "", base: { HP: "", Attack: "", Defense: "", "Sp. Attack": "", "Sp. Defense": "", Speed: "" }, image: null });
        })
        .catch(error => console.error("Erreur de modification :", error));
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  const deletePokemon = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => loadPokemons())
      .catch(error => console.error("Erreur de suppression :", error));
  };

  return (
    <div className="gestionnaire">
      <h1>Gestion des Pokémon</h1>
      <Link to="/"><button className="back-button">Retour au Pokédex</button></Link>
      <Link to="/pokedex"><button className="pokedex-button">Voir le Pokédex</button></Link>
      
      <div className="section ajout">
        <h2>Ajouter un Pokémon</h2>
        <form onSubmit={addPokemon} className="form">
          <input type="text" placeholder="Nom Français" value={newPokemon.name.french} onChange={(e) => setNewPokemon({ ...newPokemon, name: { ...newPokemon.name, french: e.target.value } })} required />
          <input type="text" placeholder="Nom Anglais" value={newPokemon.name.english} onChange={(e) => setNewPokemon({ ...newPokemon, name: { ...newPokemon.name, english: e.target.value } })} required />
          <input type="text" placeholder="Type (séparé par des virgules)" value={newPokemon.type} onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })} required />
          <input type="number" placeholder="HP" value={newPokemon.base.HP} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, HP: e.target.value } })} required />
          <input type="number" placeholder="Attaque" value={newPokemon.base.Attack} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, Attack: e.target.value } })} required />
          <input type="number" placeholder="Défense" value={newPokemon.base.Defense} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, Defense: e.target.value } })} required />
          <input type="number" placeholder="Vitesse" value={newPokemon.base.Speed} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, Speed: e.target.value } })} required />
          <input type="number" placeholder="Attaque Spéciale" value={newPokemon.base["Sp. Attack"]} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, "Sp. Attack": e.target.value } })} required />
          <input type="number" placeholder="Défense Spéciale" value={newPokemon.base["Sp. Defense"]} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, "Sp. Defense": e.target.value } })} required />
          <input type="file" onChange={(e) => handleImageUpload(e, setNewPokemon)} />
          <button type="submit">Ajouter</button>
        </form>
      </div>

      <div className="section modification">
        <h2>Modifier un Pokémon</h2>
        <form onSubmit={updatePokemon} className="form">
          <input type="text" placeholder="ID" value={editPokemon.id} onChange={(e) => setEditPokemon({ ...editPokemon, id: e.target.value })} required />
          <input type="text" placeholder="Nouveau Nom Français" value={editPokemon.name.french} onChange={(e) => setEditPokemon({ ...editPokemon, name: { ...editPokemon.name, french: e.target.value } })} required />
          <input type="text" placeholder="Nouveau Nom Anglais" value={editPokemon.name.english} onChange={(e) => setEditPokemon({ ...editPokemon, name: { ...editPokemon.name, english: e.target.value } })} required />
          <input type="text" placeholder="Nouveau Type" value={editPokemon.type} onChange={(e) => setEditPokemon({ ...editPokemon, type: e.target.value })} required />
          <input type="number" placeholder="HP" value={editPokemon.base.HP} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, HP: e.target.value } })} required />
          <input type="number" placeholder="Attaque" value={editPokemon.base.Attack} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, Attack: e.target.value } })} required />
          <input type="number" placeholder="Défense" value={editPokemon.base.Defense} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, Defense: e.target.value } })} required />
          <input type="number" placeholder="Vitesse" value={editPokemon.base.Speed} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, Speed: e.target.value } })} required />
          <input type="number" placeholder="Attaque Spéciale" value={editPokemon.base["Sp. Attack"]} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, "Sp. Attack": e.target.value } })} required />
          <input type="number" placeholder="Défense Spéciale" value={editPokemon.base["Sp. Defense"]} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, "Sp. Defense": e.target.value } })} required />
          <input type="file" onChange={(e) => handleImageUpload(e, setEditPokemon)} />
          <button type="submit">Modifier</button>
        </form>
      </div>

      <div className="section listing">
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
    </div>
  );
};

export default Gestionnaire;