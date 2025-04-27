import React, { useState, useEffect } from "react";
import Menu from "../Menu";
import axios from "axios";

const Tournament = () => {
  const [pokemons, setPokemons] = useState([]);
  const [playerPokemon, setPlayerPokemon] = useState(null);
  const [opponentPokemons, setOpponentPokemons] = useState([]);
  const [battleResult, setBattleResult] = useState(null);
  const [round, setRound] = useState(1);
  const token = localStorage.getItem("token");    

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pokemons", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setPokemons(response.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des Pokémon :", err);
      });
  }, []);

  const generateOpponents = () => {
    const shuffled = [...pokemons].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const simulateBattle = (poke1, poke2) => {
    const p1Power = poke1.base.Attack + poke1.base.Speed + poke1.base["Sp. Attack"];
    const p2Power = poke2.base.Attack + poke2.base.Speed + poke2.base["Sp. Attack"];

    if (p1Power > p2Power) return true;
    else if (p2Power > p1Power) return false;
    else return Math.random() > 0.5;
  };

  const startBattle = async () => {
    if (!playerPokemon) return;

    const opponents = generateOpponents();
    setOpponentPokemons(opponents);
    setBattleResult(null);
    setRound(1);
  };

  const fightRound = () => {
    const player = pokemons.find(p => p.id === parseInt(playerPokemon));
    const opponent = opponentPokemons[round - 1];

    const result = simulateBattle(player, opponent);

    if (result) {
      if (round >= 3) {
        setBattleResult("🏆 Vous avez gagné le tournoi !");
      } else {
        setRound(round + 1);
      }
    } else {
      setBattleResult("❌ Vous avez perdu au round " + round + ".");
    }
  };

  const getPokemonName = (id) => {
    const found = pokemons.find(p => p.id === parseInt(id));
    return found ? found.name.french : "";
  };

  return (
    <div>
        <div>
            <Menu />
        </div>
        <div>
            <h1>Tournoi Pokémon</h1>

            <div style={{ marginBottom: "20px" }}>
                <h2>Choisissez votre Pokémon</h2>
                <select value={playerPokemon || ""} onChange={(e) => setPlayerPokemon(e.target.value)}>
                <option value="">Sélectionner un Pokémon</option>
                {pokemons.map((pokemon) => (
                    <option key={pokemon.id} value={pokemon.id}>
                    {pokemon.name.french}
                    </option>
                ))}
                </select>

                <button
                onClick={startBattle}
                disabled={!playerPokemon}
                style={{ marginLeft: "10px" }}
                >
                Démarrer le tournoi
                </button>
            </div>

            {opponentPokemons.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                <h2>Plan du tournoi :</h2>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ marginBottom: "10px" }}>
                    🧢 {getPokemonName(playerPokemon)}
                    </div>
                    <div>⬇️</div>
                    <div style={{ marginBottom: "10px" }}>
                    ⚔️ {opponentPokemons[0]?.name.french}
                    </div>
                    <div>⬇️</div>
                    <div style={{ marginBottom: "10px" }}>
                    ⚔️ {opponentPokemons[1]?.name.french}
                    </div>
                    <div>⬇️</div>
                    <div style={{ marginBottom: "10px" }}>
                    ⚔️ {opponentPokemons[2]?.name.french}
                    </div>
                </div>
                </div>
            )}

            {playerPokemon && opponentPokemons.length > 0 && !battleResult && (
                <div>
                <h2>Round {round} / 3</h2>
                <h3>Votre adversaire : {opponentPokemons[round - 1]?.name.french}</h3>
                <button onClick={fightRound}>Combattre !</button>
                </div>
            )}

            {battleResult && (
                <div style={{ marginTop: "20px" }}>
                <h2>{battleResult}</h2>
                </div>
            )}
        </div>
    </div>
  );
};

export default Tournament;
