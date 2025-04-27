import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Menu from "../Menu";
import axios from "axios";
import Cards from "../Cards";
import { motion } from "framer-motion";

function Card() {
  const [p, setP] = useState({});
  const [hp, setHp] = useState('');
  const [attack, setAttack] = useState('');
  const [defense, setDefense] = useState('');
  const [speed, setSpeed] = useState('');
  const [spAttack, setSpattack] = useState('');
  const [spDefense, setSpdefense] = useState('');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const { id } = useParams();

  // Récupérer les données du Pokémon
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/pokemons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      })
      .then((response) => {
        setP(response.data);
        setHp(response.data.hp || '');  // initialisation des champs avec les valeurs existantes
        setAttack(response.data.attack || '');
        setDefense(response.data.defense || '');
        setSpeed(response.data.speed || '');
        setSpattack(response.data.spAttack || '');
        setSpdefense(response.data.spDefense || '');
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Erreur lors de la récupération du Pokémon :", err);
      });
  }, [id]);

  // Fonction de soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPokemon = {};

    // Mettre à jour seulement les champs modifiés, sinon garder la valeur actuelle
    updatedPokemon.hp = hp !== '' ? parseInt(hp, 10) : p.hp;
    updatedPokemon.attack = attack !== '' ? parseInt(attack, 10) : p.attack;
    updatedPokemon.defense = defense !== '' ? parseInt(defense, 10) : p.defense;
    updatedPokemon.speed = speed !== '' ? parseInt(speed, 10) : p.speed;
    updatedPokemon.spAttack = spAttack !== '' ? parseInt(spAttack, 10) : p.spAttack;
    updatedPokemon.spDefense = spDefense !== '' ? parseInt(spDefense, 10) : p.spDefense;

    // Vérifier si au moins un champ a été modifié
    if (
      updatedPokemon.hp === p.hp &&
      updatedPokemon.attack === p.attack &&
      updatedPokemon.defense === p.defense &&
      updatedPokemon.speed === p.speed &&
      updatedPokemon.spAttack === p.spAttack &&
      updatedPokemon.spDefense === p.spDefense
    ) {
      alert("Aucun changement n'a été effectué.");
      return;
    }

    // Envoyer la requête de mise à jour
    axios
      .put(`http://localhost:3000/api/pokemons/${id}`, updatedPokemon, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        alert('Pokémon mis à jour');
        window.location.reload();  // Recharger la page pour afficher les nouvelles valeurs
      })
      .catch((err) => {
        console.error("Erreur lors de la mise à jour du Pokémon :", err);
        alert("Erreur lors de la mise à jour du Pokémon : " + err.message);
      });
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Menu />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexWrap: "wrap",
          overflow: "auto",
          padding: "20px",
          boxSizing: "border-box",
          gap: "20px",
          justifyContent: "space-between",
        }}
      >
        {loading ? (
          <div>Chargement en cours...</div>
        ) : (
          <>
            {/* Formulaire */}
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "50%",
                overflowY: "auto",
                boxSizing: "border-box",
              }}
            >
              <h2>Modifiez les pouvoirs de votre Pokémon</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="hp">HP</label><br />
                  <input type="text" id="hp" name="hp" value={hp} onChange={(e) => setHp(e.target.value)} /><br />

                  <label htmlFor="attack">Attaque</label><br />
                  <input type="text" id="attack" name="attack" value={attack} onChange={(e) => setAttack(e.target.value)} /><br />

                  <label htmlFor="defense">Défense</label><br />
                  <input type="text" id="defense" name="defense" value={defense} onChange={(e) => setDefense(e.target.value)} /><br />

                  <label htmlFor="speed">Rapidité</label><br />
                  <input type="text" id="speed" name="speed" value={speed} onChange={(e) => setSpeed(e.target.value)} /><br />

                  <label htmlFor="spattack">Attaque spéciale</label><br />
                  <input type="text" id="spattack" name="spattack" value={spAttack} onChange={(e) => setSpattack(e.target.value)} /><br />

                  <label htmlFor="spdefense">Défense spéciale</label><br />
                  <input type="text" id="spdefense" name="spdefense" value={spDefense} onChange={(e) => setSpdefense(e.target.value)} /><br />
                </div>

                <div style={{ margin: "5px" }}>
                  <button
                    type="submit"
                    style={{
                      margin: "5px",
                      padding: "8px 16px",
                      backgroundColor: "grey",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Modifier les attributs
                  </button>
                </div>
              </form>
            </div>

            {/* Carte avec effet shiny */}
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <motion.div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div style={{ fontSize: '1.2rem', textAlign: 'center' }}>
                  <Cards p={p} />
                </div>

                {/* Reflet shiny en diagonale */}
                <motion.div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-150%',
                    width: '150%',
                    height: '100%',
                    background:
                      'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 70%)',
                    pointerEvents: 'none',
                    transform: 'skewX(-20deg)',
                  }}
                  animate={{
                    left: ['-150%', '150%'],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatDelay: 5,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .card-container {
            flex-direction: column;
          }
          .form-container, .card-container {
            max-width: 100%;
          }
          .form-container {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </div>
  );
}

export default Card;
