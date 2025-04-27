import React, { useState, useEffect } from "react";
import Menu from "../Menu"; 
import { Link } from "react-router-dom";


function APropos() {
    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }, []);
    return(
        <div>
            <div>
                <Menu />
            </div>
            <div >
            <p style={{ margin: "auto", paddingTop: "3%", fontSize: "1.1em", lineHeight: "1.6", textAlign: "justify", width: "80%"}}>
                Le Pokédex est un outil emblématique de l’univers Pokémon, servant de base de données interactive sur toutes les espèces de Pokémon répertoriées. Créé par le Professeur Chen dans les premières versions des jeux Pokémon, il est conçu pour aider les Dresseurs à identifier, analyser et comprendre les caractéristiques uniques de chaque Pokémon rencontré au cours de leur aventure.  

                Dans sa version numérique, le Pokédex permet d’accéder à des informations détaillées telles que le type, les statistiques, les évolutions, les attaques et bien d’autres aspects essentiels pour les Dresseurs et les chercheurs en Pokémon.  

                Évoluant avec le temps, il a connu plusieurs améliorations et déclinaisons au fil des générations, intégrant des fonctions avancées comme la reconnaissance des formes régionales, les capacités spéciales et même les comportements des Pokémon dans leur environnement naturel.  

                Que ce soit pour enrichir ses connaissances ou optimiser ses stratégies en combat, le Pokédex est un outil indispensable pour tout Dresseur souhaitant devenir un véritable Maître Pokémon.
            </p>
            <ul style={{ width: "-webkit-fit-content", margin: "auto", padding:"2%",  marginTop: "2%", lineHeight: "1.6", fontFamily: "'Press Start 2P', system-ui", fontSize: "10px", backgroundColor: "black"}}>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ marginRight: "10px", color: "#39FF14" }}>
                            <path d="M12 2v20m10-10H2"></path>
                        </svg>
                        <strong style={{ color: "#39FF14" }}>À propos du Pokédex :</strong> Découvrez l'origine et les fonctionnalités de notre Pokédex interactif.
                    </li>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ marginRight: "10px", color: "#39FF14" }}>
                            <path d="M12 2L12 22M3 12h18"></path>
                        </svg>
                        <strong style={{ color: "#39FF14" }}>Voir le Pokédex :</strong> Consultez la liste complète des Pokémon enregistrés dans notre Pokédex.
                    </li>
                    <li style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ marginRight: "10px", color: "#39FF14" }}>
                            <path d="M3 5h18v14H3z"></path>
                        </svg>
                        <strong style={{ color: "#39FF14" }}>Créer une carte :</strong> Créez de nouvelles cartes Pokémon et ajoutez-les à votre Pokédex.
                    </li>
                    <li style={{ display: "flex", alignItems: "center" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style={{ marginRight: "10px", color: "#39FF14" }}>
                            <path d="M12 2L12 22M3 12h18"></path>
                            <circle cx="12" cy="12" r="8"></circle>
                        </svg>
                        <strong style={{ color: "#39FF14" }}>Tournois :</strong> Participez à des tournois Pokémon pour tester vos compétences et rivaliser avec d'autres dresseurs.
                    </li>
                </ul>

            </div>
        </div>
    );
}

export default APropos