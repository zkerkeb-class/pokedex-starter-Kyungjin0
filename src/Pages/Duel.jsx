import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Duel.css';
import Navbar from '../component/Navbar';

const API_URL = "http://localhost:3000/api/pokemons";

const Duel = () => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [computerPokemon, setComputerPokemon] = useState(null);
    const [playerHP, setPlayerHP] = useState(0);
    const [computerHP, setComputerHP] = useState(0);
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [gameStatus, setGameStatus] = useState('selection'); // 'selection', 'battle', 'finished'
    const [battleLog, setBattleLog] = useState([]);
    const [damageAnimation, setDamageAnimation] = useState(null);

    // Charger tous les Pokémon au démarrage
    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const response = await axios.get(API_URL);
                if (response.data && response.data.pokemons) {
                    setAllPokemons(response.data.pokemons);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des Pokémon:", error);
            }
        };
        fetchPokemons();
    }, []);

    // Mettre à jour les HP quand les Pokémon sont sélectionnés
    useEffect(() => {
        if (selectedPokemon) {
            setPlayerHP(selectedPokemon.base.HP);
        }
        if (computerPokemon) {
            setComputerHP(computerPokemon.base.HP);
        }
    }, [selectedPokemon, computerPokemon]);

    // Sélectionner un Pokémon pour le joueur
    const handlePokemonSelect = (pokemon) => {
        setSelectedPokemon(pokemon);
        // Sélectionner un Pokémon aléatoire pour l'ordinateur
        const randomPokemon = allPokemons[Math.floor(Math.random() * allPokemons.length)];
        setComputerPokemon(randomPokemon);
        setGameStatus('battle');
        setBattleLog([`Le duel commence entre ${pokemon.name.french} et ${randomPokemon.name.french}!`]);
    };

    const showDamageAnimation = (damage, isPlayer) => {
        const element = document.createElement('div');
        element.className = 'damage-text';
        element.textContent = `-${damage}`;
        
        const target = isPlayer ? 
            document.querySelector('.pokemon-battle-card.player') : 
            document.querySelector('.pokemon-battle-card.computer');
            
        if (target) {
            const rect = target.getBoundingClientRect();
            element.style.left = `${rect.left + rect.width/2}px`;
            element.style.top = `${rect.top + rect.height/2}px`;
            document.body.appendChild(element);
            
            setTimeout(() => {
                document.body.removeChild(element);
            }, 1500);
        }
    };

    // Calculer les dégâts
    const calculateDamage = (attacker) => {
        return Math.floor(attacker.base.Attack / 2);
    };

    // Gérer l'attaque du joueur
    const handlePlayerAttack = () => {
        if (!isPlayerTurn || gameStatus !== 'battle') return;

        const damage = calculateDamage(selectedPokemon);
        const newComputerHP = Math.max(0, computerHP - damage);
        setComputerHP(newComputerHP);
        showDamageAnimation(damage, false);
        setBattleLog(prev => [...prev, `${selectedPokemon.name.french} attaque et inflige ${damage} dégâts!`]);

        if (newComputerHP <= 0) {
            setGameStatus('finished');
            setBattleLog(prev => [...prev, `${selectedPokemon.name.french} gagne le combat!`]);
        } else {
            setIsPlayerTurn(false);
            // Tour de l'ordinateur
            setTimeout(computerTurn, 1000);
        }
    };

    // Tour de l'ordinateur
    const computerTurn = () => {
        const damage = calculateDamage(computerPokemon);
        const newPlayerHP = Math.max(0, playerHP - damage);
        setPlayerHP(newPlayerHP);
        showDamageAnimation(damage, true);
        setBattleLog(prev => [...prev, `${computerPokemon.name.french} attaque et inflige ${damage} dégâts!`]);

        if (newPlayerHP <= 0) {
            setGameStatus('finished');
            setBattleLog(prev => [...prev, `${computerPokemon.name.french} gagne le combat!`]);
        } else {
            setIsPlayerTurn(true);
        }
    };

    // Restaurer les HP
    const handleHeal = (isPlayer) => {
        if (isPlayer) {
            const maxHP = selectedPokemon.base.HP;
            setPlayerHP(maxHP);
            setBattleLog(prev => [...prev, `${selectedPokemon.name.french} restaure ses HP!`]);
        } else {
            const maxHP = computerPokemon.base.HP;
            setComputerHP(maxHP);
            setBattleLog(prev => [...prev, `${computerPokemon.name.french} restaure ses HP!`]);
        }
    };

    // Recommencer le jeu
    const handleRestart = () => {
        setSelectedPokemon(null);
        setComputerPokemon(null);
        setPlayerHP(0);
        setComputerHP(0);
        setIsPlayerTurn(true);
        setGameStatus('selection');
        setBattleLog([]);
    };

    const handleReturnToSelection = () => {
        setSelectedPokemon(null);
        setComputerPokemon(null);
        setPlayerHP(0);
        setComputerHP(0);
        setIsPlayerTurn(true);
        setGameStatus('selection');
        setBattleLog([]);
    };

    return (
        <>
            <Navbar />
            <div className="duel-container">
                {gameStatus === 'selection' ? (
                    <div className="pokemon-selection">
                        <h2>Choisissez votre Pokémon</h2>
                        <div className="duel-pokemon-grid">
                            {allPokemons.map(pokemon => (
                                <div 
                                    key={pokemon.id} 
                                    className="duel-selection-card"
                                    onClick={() => handlePokemonSelect(pokemon)}
                                >
                                    <img 
                                        src={pokemon.image} 
                                        alt={pokemon.name.french} 
                                        className="duel-pokemon-image"
                                    />
                                    <h3 className="duel-pokemon-name">{pokemon.name.french}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="battle-arena">
                        <div className="navigation-buttons">
                            <button className="return-button" onClick={handleReturnToSelection}>
                                Retour
                            </button>
                            {gameStatus === 'finished' && (
                                <button className="restart-button" onClick={handleRestart}>
                                    Nouveau
                                </button>
                            )}
                        </div>
                        <div className="battle-field">
                            <div className="pokemon-battle-card player">
                                <img src={selectedPokemon?.image} alt={selectedPokemon?.name.french} />
                                <h3>{selectedPokemon?.name.french}</h3>
                                <p>HP: {playerHP}/{selectedPokemon?.base.HP}</p>
                                <div className="battle-controls">
                                    <button 
                                        onClick={() => handlePlayerAttack()} 
                                        disabled={!isPlayerTurn || gameStatus === 'finished'}
                                    >
                                        Attaquer
                                    </button>
                                    <button onClick={() => handleHeal(true)}>Soigner</button>
                                </div>
                            </div>

                            <div className="pokemon-battle-card computer">
                                <img src={computerPokemon?.image} alt={computerPokemon?.name.french} />
                                <h3>{computerPokemon?.name.french}</h3>
                                <p>HP: {computerHP}/{computerPokemon?.base.HP}</p>
                                <div className="battle-controls">
                                    <button onClick={() => handleHeal(false)}>Soigner</button>
                                </div>
                            </div>
                        </div>

                        <div className="battle-log">
                            <h3>Journal de combat</h3>
                            <div className="log-entries">
                                {battleLog.map((log, index) => (
                                    <p key={index}>{log}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Duel;
