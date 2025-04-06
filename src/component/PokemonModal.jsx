import React from 'react';
import '../style/PokemonModal.css';

const PokemonModal = ({ pokemon, onClose, isShiny, setIsShiny }) => {
    if (!pokemon) return null;

    const getShinyImageUrl = () => {
        const normalPath = pokemon.image;
        return normalPath.replace('/pokemons/', '/pokemons/shiny/');
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                
                {/* Carte Pokémon avec le même style que vos cartes actuelles */}
                <div className="pokemon-card" data-type={pokemon.type[0]}>
                    <div className="card-header">
                        <div className="header-left">
                            <h1 className="pokemon-name">{pokemon.name.french}</h1>
                        </div>
                        <div className="header-right">
                            <img 
                                src={`/src/assets/types/${pokemon.type[0]}.png`} 
                                alt={pokemon.type[0]} 
                                className="type-icon-header"
                            />
                        </div>
                    </div>

                    <div className="card-image-container">
                        <img 
                            src={isShiny ? getShinyImageUrl() : pokemon.image} 
                            alt={pokemon.name.french}
                            className="pokemon-image"
                        />
                        <button 
                            className={`shiny-button ${isShiny ? 'active' : ''}`}
                            onClick={() => setIsShiny(!isShiny)}
                        >
                            ✨
                        </button>
                    </div>

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
                </div>

                {/* Informations détaillées */}
                <div className="pokemon-info">
                    <div className="info-section">
                        <h3>Identité</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Numéro Pokédex</span>
                                <span className="info-value">#{String(pokemon.id).padStart(3, '0')}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Nom Français</span>
                                <span className="info-value">{pokemon.name.french}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Nom Anglais</span>
                                <span className="info-value">{pokemon.name.english}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Nom Japonais</span>
                                <span className="info-value">{pokemon.name.japanese}</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Types et Génération</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Type Principal</span>
                                <div className="type-display">
                                    <img 
                                        src={`/src/assets/types/${pokemon.type[0]}.png`} 
                                        alt={pokemon.type[0]} 
                                        className="type-icon-small"
                                    />
                                    <span>{pokemon.type[0]}</span>
                                </div>
                            </div>
                            {pokemon.type[1] && (
                                <div className="info-item">
                                    <span className="info-label">Type Secondaire</span>
                                    <div className="type-display">
                                        <img 
                                            src={`/src/assets/types/${pokemon.type[1]}.png`} 
                                            alt={pokemon.type[1]} 
                                            className="type-icon-small"
                                        />
                                        <span>{pokemon.type[1]}</span>
                                    </div>
                                </div>
                            )}
                            <div className="info-item">
                                <span className="info-label">Génération</span>
                                <span className="info-value">{pokemon.generation}</span>
                            </div>
                        </div>
                    </div>

                    <div className="info-section">
                        <h3>Statistiques Détaillées</h3>
                        <div className="stats-detail">
                            <div className="stat-detail-item">
                                <span className="stat-label">🧡 Points de Vie</span>
                                <div className="stat-bar-container">
                                    <div className="stat-bar hp-bar" style={{width: `${(pokemon.base.HP / 255) * 100}%`}}></div>
                                    <span className="stat-number">{pokemon.base.HP}</span>
                                </div>
                            </div>
                            <div className="stat-detail-item">
                                <span className="stat-label">🗡️ Attaque</span>
                                <div className="stat-bar-container">
                                    <div className="stat-bar attack-bar" style={{width: `${(pokemon.base.Attack / 255) * 100}%`}}></div>
                                    <span className="stat-number">{pokemon.base.Attack}</span>
                                </div>
                            </div>
                            <div className="stat-detail-item">
                                <span className="stat-label">🛡 Défense</span>
                                <div className="stat-bar-container">
                                    <div className="stat-bar defense-bar" style={{width: `${(pokemon.base.Defense / 255) * 100}%`}}></div>
                                    <span className="stat-number">{pokemon.base.Defense}</span>
                                </div>
                            </div>
                            <div className="stat-detail-item">
                                <span className="stat-label">⚔️ Attaque Spéciale</span>
                                <div className="stat-bar-container">
                                    <div className="stat-bar sp-attack-bar" style={{width: `${(pokemon.base.SpAttack / 255) * 100}%`}}></div>
                                    <span className="stat-number">{pokemon.base.SpAttack}</span>
                                </div>
                            </div>
                            <div className="stat-detail-item">
                                <span className="stat-label">🛡️ Défense Spéciale</span>
                                <div className="stat-bar-container">
                                    <div className="stat-bar sp-defense-bar" style={{width: `${(pokemon.base.SpDefense / 255) * 100}%`}}></div>
                                    <span className="stat-number">{pokemon.base.SpDefense}</span>
                                </div>
                            </div>
                            <div className="stat-detail-item">
                                <span className="stat-label">👟 Vitesse</span>
                                <div className="stat-bar-container">
                                    <div className="stat-bar speed-bar" style={{width: `${(pokemon.base.Speed / 255) * 100}%`}}></div>
                                    <span className="stat-number">{pokemon.base.Speed}</span>
                                </div>
                            </div>
                            <div className="total-stats">
                                <span className="stat-label">Total des stats</span>
                                <span className="stat-number">{
                                    pokemon.base.HP + 
                                    pokemon.base.Attack + 
                                    pokemon.base.Defense + 
                                    pokemon.base.SpAttack + 
                                    pokemon.base.SpDefense + 
                                    pokemon.base.Speed
                                }</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonModal; 