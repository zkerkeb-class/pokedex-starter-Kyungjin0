import "../../style/Carte.css";



const Carte = ({ pokemon, addPokemon, updatePokemon }) => {
  return (
    <div className="pokemon-card" data-type={pokemon.type[0]}>
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
        <img src={pokemon.image} alt={pokemon.name.french} className="pokemon-image" />
      </div>

      {/* Section des stats */}
      <div className="card-stats">
        <div className="stats-grid">
          <div className="stat-block">
            <span>🧡{pokemon.base.HP}</span>
          </div>
          <div className="stat-block">
            <span>🗡️{pokemon.base.Attack}</span>
          </div>
          <div className="stat-block">
        
            <span>🛡{pokemon.base.Defense}</span>
            
          </div>
          <div className="stat-block">
            <span>⚔️{pokemon.base["Sp. Attack"]}</span>
          </div>
          <div className="stat-block">
            <span>🛡️{pokemon.base["Sp. Defense"]}</span>
          </div>
          <div className="stat-block">
            <span>👟{pokemon.base.Speed}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carte;
