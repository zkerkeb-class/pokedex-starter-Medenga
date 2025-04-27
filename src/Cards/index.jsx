import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const types = {
  "Normal" : "/src/assets/types/1.png",
  "Fighting" : "/src/assets/types/2.png",
  "Flying" : "/src/assets/types/3.png",
  "Poison" : "/src/assets/types/4.png",
  "Ghost" : "/src/assets/types/5.png",
  "Rock" : "/src/assets/types/6.png",
  "Bug" : "/src/assets/types/7.png",
  "Ground" : "/src/assets/types/8.png",
  "Steel" : "/src/assets/types/9.png",
  "Fire" : "/src/assets/types/10.png",
  "Water" : "/src/assets/types/11.png",
  "Grass" : "/src/assets/types/12.png",
  "Electric" : "/src/assets/types/13.png",
  "Psychic" : "/src/assets/types/14.png",
  "Ice" : "/src/assets/types/15.png",
  "Dragon" : "/src/assets/types/16.png",
  "Dark" : "/src/assets/types/17.png",
  "Fairy" : "/src/assets/types/18.png"
}

const typeColors = {
  "Normal": "#A8A77A",
  "Fighting": "#C22E28",
  "Flying": "#A98FF3",
  "Poison": "#A33EA1",
  "Ghost": "#735797",
  "Rock": "#B6A136",
  "Bug": "#A6B91A",
  "Ground": "#E2BF65",
  "Steel": "#B7B7CE",
  "Fire": "#EE8130",
  "Water": "#6390F0",
  "Grass": "#7AC74C",
  "Electric": "#F7D02C",
  "Psychic": "#F95587",
  "Ice": "#96D9D6",
  "Dragon": "#6F35FC",
  "Dark": "#705746",
  "Fairy": "#D685AD"
};
   
const Cards = ({ p }) => {
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { id, name, type, image, base } = p;
  const hp = base.HP;
  const attack = base.Attack;
  const defense = base.Defense;
  const speed = base.Speed;
  const spattack = base.Sp[" Attack"];
  const spdefense = base.Sp[" Defense"];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/pokemons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setDeleted(true); // pour ne plus afficher la carte sans recharger
      navigate("/pokedex"); // redirige après
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: typeColors[type[0]],
        border: `6px solid ${typeColors[type[0]]}`,
        borderRadius: "20px",
        margin: "10px",
        boxShadow: `0 4px 10px ${typeColors[type[0]]}80`,
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <div style={{ backgroundColor: "#f8f8f8", padding: "20px", textAlign: "center" }}>
        <img
          src={image}
          alt={name.french}
          style={{ width: "80%", height: "auto", borderRadius: "10px" }}
        />
      </div>

      <div
        style={{
          backgroundColor: typeColors[type[0]],
          padding: "10px 20px",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "18px",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {name.french}
      </div>

      <div style={{ padding: "15px" }}>
        <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
          {type.map((t) => (
            <img
              key={t}
              src={types[t]}
              alt={t}
              title={t}
              style={{ height: "20px", backgroundColor: "#eee", borderRadius: "5px", padding: "3px" }}
            />
          ))}
        </div>

        <div style={{ fontSize: "14px", lineHeight: "1.5" }}>
          <p><strong>HP:</strong> {hp}</p>
          <p><strong>Attack:</strong> {attack}</p>
          <p><strong>Defense:</strong> {defense}</p>
          <p><strong>Speed:</strong> {speed}</p>
          <p><strong>Sp Defense:</strong> {spdefense}</p>
          <p><strong>Sp Attack:</strong> {spattack}</p>
        </div>

        <button
          onClick={() => handleDelete(id)}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#FF4747",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default Cards;
