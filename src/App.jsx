import { useState } from 'react';
import pokemons from './assets/pokemons';
import './App.css';
import Carte from './component/carte/Carte';

function App() {
  
  const [search, setSearch] = useState("");

  // Filtrer les Pokémon en fonction de la barre de recherche
  const filteredPokemons = pokemons.filter(pokemon => 
    pokemon.name.french.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Barre de recherche */}
      <p>Barre de recherche</p>
      <div className="search-bar">
        <input type="text"
          placeholder="Rechercher un Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      
      {/* Affichage du Pokédex */}
      <div className="pokedex-container">
        {filteredPokemons.slice(0, 150).map((pokemon, index) => (
          <Carte key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default App;
