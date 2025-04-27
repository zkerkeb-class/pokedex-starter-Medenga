import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
   

const Cards = ({p}) => {
  const [cards, setCards] = useState(null)

  const id = p.id
  const name=p.name.french
  const type=p.type
  const image=p.image
  const hp=p.base.HP
  const attack=p.base.Attack
  const defense=p.base.Defense
  const speed=p.base.Speed
  const spattack = p.base.Sp[" Attack"];
  const spdefense = p.base.Sp[" Defense"];


  //console.log(p.base.Sp)
    return(
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
              alt={`${name}`}
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
            {name}
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
              <p style={{ marginTop: "2px", marginBottom: "2px"}}><strong>HP:</strong> {hp}</p>
              <p style={{ marginTop: "2px", marginBottom: "2px"}}><strong>Attack:</strong> {attack}</p>
              <p style={{ marginTop: "2px", marginBottom: "2px"}}><strong>Defense:</strong> {defense}</p>
              <p style={{ marginTop: "2px", marginBottom: "2px"}}><strong>Speed:</strong> {speed}</p>
              <p style={{ marginTop: "2px", marginBottom: "2px"}}><strong>Sp Defense:</strong> {spdefense}</p>
              <p style={{ marginTop: "2px", marginBottom: "2px"}}><strong>Sp Attack:</strong> {spattack}</p>
            </div>
            <button
                onClick={() => deletePokemon(id)}
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
}

export default Cards;