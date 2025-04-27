import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Menu() {
    const handleLogout = () => {
        localStorage.removeItem("token"); // Supprime le token
        window.location.href = "/auth"; // Redirige vers la page d'accueil ou login
      };
      
    return(
        <div style={{ width: "-webkit-fill-available", backgroundColor: "rgb(59, 59, 59)", padding: "2%" }}>
            <button onClick={handleLogout} style={{ 
                position: "absolute",
                top: "10px",
                right: "10px",
                margin: "5px",
                padding: "10px", 
                backgroundColor: "#ff4d4f", 
                color: "white", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer" 
            }}>
            Se déconnecter
            </button>

            <div>
                <img style={{ width: "30%" }} src="/src/assets/image/pokelogo.png" alt="logo" />
            </div>
            <p>Bienvenue dans le pokedex que souhaitez vous faire?</p>
            <div>
                <Link to="/apropos"><button style={{ margin: "5px", padding: "8px 16px", backgroundColor: "grey", border: "none", borderRadius: "5px", cursor: "pointer" }}>À propos du pokedex</button></Link>
                <Link to="/pokedex"><button style={{ margin: "5px", padding: "8px 16px", backgroundColor: "grey", border: "none", borderRadius: "5px", cursor: "pointer" }}>Voir le Pokedex</button></Link>
                <Link to="/pokedex/pokemon/new"><button style={{ margin: "5px", padding: "8px 16px", backgroundColor: "grey", border: "none", borderRadius: "5px", cursor: "pointer" }}>Créer une carte</button></Link>
                <Link to="/pokedex/tournament"><button style={{ margin: "5px", padding: "8px 16px", backgroundColor: "grey", border: "none", borderRadius: "5px", cursor: "pointer" }}>Tournois</button></Link>
            </div>
        </div>
    );
}

export default Menu