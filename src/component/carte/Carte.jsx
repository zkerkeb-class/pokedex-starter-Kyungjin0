import "../../style/Carte.css";
import { useState } from "react";
import PokemonModal from "../PokemonModal";

const Carte = ({ pokemon }) => {
  const [isShiny, setIsShiny] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  // Fonction pour accéder aux stats spéciales en toute sécurité
  const getSpecialStat = (type) => {
    if (pokemon.base.Sp && pokemon.base.Sp['"Attack"']) {
      return type === 'Attack' ? pokemon.base.Sp['"Attack"'] : pokemon.base.Sp['"Defense"'];
    }
    if (pokemon.base.Sp && pokemon.base.Sp['Attack']) {
      return type === 'Attack' ? pokemon.base.Sp['Attack'] : pokemon.base.Sp['Defense'];
    }
    return 0;
    
  };

  // Fonction pour obtenir l'URL de l'image shiny
  const getShinyImageUrl = () => {
    const normalPath = pokemon.image;
    return normalPath.replace('/pokemons/', '/pokemons/shiny/');
  };

  return (
    <>
      <div className="pokemon-card" onClick={handleClick} data-type={pokemon.type[0]}>
        {/* En-tête : Nom et Type */}
        <div className="card-header">
          <div className="header-left">
            <h1 className="pokemon-name">{pokemon.name.french}</h1>
          </div>
          <div className="header-right">
            <img src={`./src/assets/types/${pokemon.type[0]}.png`} alt={pokemon.type[0]} className="type-icon-header" />
          </div>
        </div>
        
        {/* Image du Pokémon */}
        <div className="card-image-container">
          <img 
            src={isShiny ? getShinyImageUrl() : pokemon.image} 
            alt={pokemon.name.french} 
            className="pokemon-image" 
          />
          <button 
            className={`shiny-button ${isShiny ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setIsShiny(!isShiny);
            }}
          >
            ✨
          </button>
        </div>

        {/* Section des stats */}
        <div className="card-stats">
          <div className="stats-grid">
            <div className="stat-block">
              <span>🧡{pokemon.base.HP || 0}</span>
            </div>
            <div className="stat-block">
              <span>🗡️{pokemon.base.Attack || 0}</span>
            </div>
            <div className="stat-block">
              <span>🛡{pokemon.base.Defense || 0}</span>
            </div>
            <div className="stat-block">
              <span>⚔️{pokemon.base.SpAttack|| 0}</span>
            </div>
            <div className="stat-block">
              <span>🛡️{pokemon.base.SpDefense|| 0}</span>
            </div>
            <div className="stat-block">
              <span>👟{pokemon.base.Speed || 0}</span>
            </div>
          </div>
        </div>

        {/* Debug section - à retirer après test */}
        <div style={{display: 'none'}}>
          <pre>
            {JSON.stringify({
              HP: pokemon.base.HP,
              Attack: pokemon.base.Attack,
              Defense: pokemon.base.Defense,
              SpAttack: pokemon.base.Sp?.Attack,
              SpDefense: pokemon.base.Sp?.Defense,
              Speed: pokemon.base.Speed
            }, null, 2)}
          </pre>
        </div>
      </div>

      {showModal && (
        <PokemonModal 
          pokemon={pokemon} 
          onClose={() => setShowModal(false)}
          isShiny={isShiny}
          setIsShiny={setIsShiny}
        />
      )}
    </>
  );
};

export default Carte;
