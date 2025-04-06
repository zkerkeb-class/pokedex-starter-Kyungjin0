import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../style/Gestionnaire.css'; 

const API_URL = "http://localhost:3000/api/pokemons";

const Gestionnaire = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  console.log(pokemons);
  const [newPokemon, setNewPokemon] = useState({ 
    name: { french: "", english: "", japanese: "" }, 
    type: "", 
    base: { HP: "", Attack: "", Defense: "", "SpAttack": "", "SpDefense": "", Speed: "" }, 
    image: null 
  });
  const [editPokemon, setEditPokemon] = useState({ 
    id: "", 
    name: { french: "", english: "", japanese: "" }, 
    type: "", 
    base: { HP: "", Attack: "", Defense: "", "SpAttack": "", "SpDefense": "", Speed: "" }, 
    image: null 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Configuration Axios avec le token
  const getAuthConfig = () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token brut:', token);

      if (!token) {
        setError("Vous n'êtes pas connecté. Redirection...");
        setTimeout(() => navigate('/admin'), 2000);
        return null;
      }

      // Nettoyer le token
      const cleanToken = token.replace('Bearer ', '').trim();
      const formattedToken = `Bearer ${cleanToken}`;
      console.log('Token formaté:', formattedToken);

      return {
        headers: {
          'Authorization': formattedToken,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        validateStatus: status => {
          return status >= 200 && status < 300;
        }
      };
    } catch (error) {
      console.error('Erreur lors de la configuration:', error);
      return null;
    }
  };

  useEffect(() => {
    const checkAndLoadPokemons = async () => {
      const token = localStorage.getItem('token');
      console.log('Token au chargement:', token);
      
      if (!token) {
        setError("Vous devez être connecté pour accéder à cette page");
        setTimeout(() => navigate('/admin'), 2000);
        return;
      }

      try {
        // Vérifier la validité du token
        const config = getAuthConfig();
        if (!config) return;

        // Faire une requête test pour vérifier le token
        await axios.get(API_URL, config);
        
        // Si pas d'erreur, charger les pokémons
        loadPokemons();
      } catch (error) {
        console.error('Erreur de vérification du token:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          setError("Session invalide. Redirection...");
          setTimeout(() => navigate('/admin'), 2000);
        }
      }
    };

    checkAndLoadPokemons();
  }, []);

  const loadPokemons = async () => {
    setLoading(true);
    setError(null);
    try {
      const config = getAuthConfig();
      if (!config) return;

      const response = await axios.get(API_URL, config);
      if (response.data && Array.isArray(response.data)) {
        setPokemons(response.data.sort((a, b) => a.id - b.id));
      } else if (response.data && Array.isArray(response.data.pokemons)) {
        setPokemons(response.data.pokemons.sort((a, b) => a.id - b.id));
      } else {
        throw new Error('Format de données incorrect');
      }
    } catch (error) {
      console.error("Erreur lors du chargement des Pokémon:", error);
      setError("Erreur lors du chargement des Pokémon");
      if (error.response?.status === 401) {
        setError("Session expirée. Redirection dans 2 secondes...");
        setTimeout(() => navigate('/admin'), 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e, setPokemon) => {
    const file = e.target.files[0];
    if (file && file.size > 5242880) {
      alert("L'image est trop grande. Taille maximum: 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPokemon(prevState => ({ ...prevState, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const addPokemon = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const config = getAuthConfig();
      if (!config) return;

      // Validation des champs requis
      if (!newPokemon.name.french || !newPokemon.name.english || !newPokemon.type) {
        setError("Veuillez remplir au moins le nom français, anglais et le type");
        return;
      }

      const pokemonData = {
        name: {
          french: newPokemon.name.french,
          english: newPokemon.name.english,
          japanese: newPokemon.name.japanese || "",
          chinese: newPokemon.name.chinese || ""
        },
        type: newPokemon.type.split(",").map(type => type.trim()),
        base: {
          HP: parseInt(newPokemon.base.HP) || 0,
          Attack: parseInt(newPokemon.base.Attack) || 0,
          Defense: parseInt(newPokemon.base.Defense) || 0,
          SpAttack: parseInt(newPokemon.base.SpAttack) || 0,
          SpDefense: parseInt(newPokemon.base.SpDefense) || 0,
          Speed: parseInt(newPokemon.base.Speed) || 0
        }
      };

      if (newPokemon.image) {
        pokemonData.image = newPokemon.image;
      }

      console.log('Données envoyées à l\'API:', JSON.stringify(pokemonData, null, 2));

      const response = await axios.post(API_URL, pokemonData, config);
      
      if (response.data) {
        await loadPokemons();
        setNewPokemon({ 
          name: { french: "", english: "", japanese: "", chinese: "" }, 
          type: "", 
          base: { HP: "", Attack: "", Defense: "", SpAttack: "", SpDefense: "", Speed: "" }, 
          image: null 
        });
        alert("Pokémon ajouté avec succès !");
      }
    } catch (error) {
      console.error("Erreur détaillée lors de l'ajout:", error);
      if (error.response?.status === 401) {
        setError("Session expirée. Redirection dans 2 secondes...");
        setTimeout(() => {
          localStorage.removeItem('token');
          navigate('/admin');
        }, 2000);
      } else {
        setError(error.response?.data?.error || "Erreur lors de l'ajout du Pokémon");
      }
    } finally {
      setLoading(false);
    }
  };

  const updatePokemon = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const config = getAuthConfig();
      if (!config) return;

      if (!editPokemon.id) {
        setError("L'ID du Pokémon est requis.");
        return;
      }


      const pokemonData = {
        name: {
          french: editPokemon.name.french,
          english: editPokemon.name.english,
          japanese: editPokemon.name.japanese || "",
          chinese: editPokemon.name.chinese || ""
        },
        type: editPokemon.type.split(",").map(type => type.trim()),
        base: {
          HP: parseInt(editPokemon.base.HP) || 0,
          Attack: parseInt(editPokemon.base.Attack) || 0,
          Defense: parseInt(editPokemon.base.Defense) || 0,
          SpAttack: parseInt(editPokemon.base.SpAttack) || 0,
          SpDefense: parseInt(editPokemon.base.SpDefense) || 0,
          Speed: parseInt(editPokemon.base.Speed) || 0
        }
      };

      if (editPokemon.image) {
        pokemonData.image = editPokemon.image;
      }

      const response = await axios.put(`${API_URL}/${editPokemon.id}`, pokemonData, config);
      
      if (response.data) {
        await loadPokemons();
        setEditPokemon({ 
          id: "", 
          name: { french: "", english: "", japanese: "", chinese: "" }, 
          type: "", 
          base: { HP: "", Attack: "", Defense: "", SpAttack: "", SpDefense: "", Speed: "" }, 
          image: null 
        });
        alert("Pokémon modifié avec succès !");
      }
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      if (error.response?.status === 401) {
        setError("Session expirée. Redirection dans 2 secondes...");
        setTimeout(() => navigate('/admin'), 2000);
      } else {
        setError(error.response?.data?.message || "Erreur lors de la modification du Pokémon");
      }
    } finally {
      setLoading(false);
    }
  };

  const deletePokemon = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce Pokémon ?")) {
      setLoading(true);
      setError(null);
      try {
        const config = getAuthConfig();
        if (!config) return;
        console.log(config);

        const response = await axios.delete(`${API_URL}/${id}`, {...config});
        if (response.status === 200 || response.status === 204) {
          await loadPokemons();
          alert("Pokémon supprimé avec succès !");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        if (error.response?.status === 401) {
          setError("Session expirée. Redirection dans 2 secondes...");
          setTimeout(() => navigate('/admin'), 2000);
        } else {
          setError(error.response?.data?.message || "Erreur lors de la suppression du Pokémon");
        }
      } finally {
        setLoading(false);
      }

    }
  };
  
  return (
    <div className="gestionnaire">
      <h1>Gestion des Pokémon</h1>
      
      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading">Chargement...</div>}

      <div className="section ajout">
        <h2>Ajouter un Pokémon</h2>
        <form onSubmit={addPokemon} className="form">
          <input type="text" placeholder="Nom Français" value={newPokemon.name.french} onChange={(e) => setNewPokemon({ ...newPokemon, name: { ...newPokemon.name, french: e.target.value } })} required />
          <input type="text" placeholder="Nom Anglais" value={newPokemon.name.english} onChange={(e) => setNewPokemon({ ...newPokemon, name: { ...newPokemon.name, english: e.target.value } })} required />
          <input type="text" placeholder="Nom Japonais" value={newPokemon.name.japanese} onChange={(e) => setNewPokemon({ ...newPokemon, name: { ...newPokemon.name, japanese: e.target.value } })} required />
          <input type="text" placeholder="Nom Chinois" value={newPokemon.name.chinese} onChange={(e) => setNewPokemon({ ...newPokemon, name: { ...newPokemon.name, chinese: e.target.value } })} required />
          <input type="text" placeholder="Type (séparé par des virgules)" value={newPokemon.type} onChange={(e) => setNewPokemon({ ...newPokemon, type: e.target.value })} required />
          <input type="number" placeholder="HP" value={newPokemon.base.HP} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, HP: e.target.value } })} required />
          <input type="number" placeholder="Attaque" value={newPokemon.base.Attack} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, Attack: e.target.value } })} required />
          <input type="number" placeholder="Défense" value={newPokemon.base.Defense} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, Defense: e.target.value } })} required />
          <input type="number" placeholder="Attaque Spéciale" value={newPokemon.base.SpAttack} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, SpAttack: e.target.value } })} required />
          <input type="number" placeholder="Défense Spéciale" value={newPokemon.base.SpDefense} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, SpDefense: e.target.value } })} required />
          <input type="number" placeholder="Vitesse" value={newPokemon.base.Speed} onChange={(e) => setNewPokemon({ ...newPokemon, base: { ...newPokemon.base, Speed: e.target.value } })} required />
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewPokemon)} />
          <button type="submit" disabled={loading}>Ajouter</button>
        </form>
      </div>

      <div className="section modification">
        <h2>Modifier un Pokémon</h2>
        <form onSubmit={updatePokemon} className="form">
          <input type="text" placeholder="ID" value={editPokemon.id} onChange={(e) => setEditPokemon({ ...editPokemon, id: e.target.value })} required />
          <input type="text" placeholder="Nouveau Nom Français" value={editPokemon.name.french} onChange={(e) => setEditPokemon({ ...editPokemon, name: { ...editPokemon.name, french: e.target.value } })} required />
          <input type="text" placeholder="Nouveau Nom Anglais" value={editPokemon.name.english} onChange={(e) => setEditPokemon({ ...editPokemon, name: { ...editPokemon.name, english: e.target.value } })} required />
          <input type="text" placeholder="Nouveau Nom Japonais" value={editPokemon.name.japanese} onChange={(e) => setEditPokemon({ ...editPokemon, name: { ...editPokemon.name, japanese: e.target.value } })} required />
          <input type="text" placeholder="Nouveau Nom Chinois" value={editPokemon.name.chinese} onChange={(e) => setEditPokemon({ ...editPokemon, name: { ...editPokemon.name, chinese: e.target.value } })} required />
          <input type="text" placeholder="Nouveau Type" value={editPokemon.type} onChange={(e) => setEditPokemon({ ...editPokemon, type: e.target.value })} required />
          <input type="number" placeholder="HP" value={editPokemon.base.HP} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, HP: e.target.value } })} required />
          <input type="number" placeholder="Attaque" value={editPokemon.base.Attack} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, Attack: e.target.value } })} required />
          <input type="number" placeholder="Défense" value={editPokemon.base.Defense} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, Defense: e.target.value } })} required />
          <input type="number" placeholder="Vitesse" value={editPokemon.base.Speed} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, Speed: e.target.value } })} required />
          <input type="number" placeholder="Attaque Spéciale" value={editPokemon.base.SpAttack} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, SpAttack: e.target.value } })} required />
          <input type="number" placeholder="Défense Spéciale" value={editPokemon.base.SpDefense} onChange={(e) => setEditPokemon({ ...editPokemon, base: { ...editPokemon.base, SpDefense: e.target.value } })} required />
          <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setEditPokemon)} />
          <button type="submit" disabled={loading}>Modifier</button>
        </form>
      </div>

      <div className="section listing">
        <h2>Liste des Pokémon</h2>
        <ul>
          {pokemons.map(pokemon => (
            <li key={pokemon.id} className="pokemon-item">
              <div className="pokemon-info">
                <span className="pokemon-id">{pokemon.id}</span>
                <span className="pokemon-name">{pokemon.name.french}</span>
                <span className="pokemon-type">Type : {Array.isArray(pokemon.type) ? pokemon.type.join(", ") : pokemon.type}</span>
              </div>
              <button 
                onClick={() => deletePokemon(pokemon.id)} 
                className="supprimer-btn"
                disabled={loading}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Gestionnaire;