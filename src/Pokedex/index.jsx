import React, { useState, useEffect } from "react";
import Cards from "../Cards";
import Menu from "../Menu";
import SearchBar from "../searchBar"; 
import axios from "axios";
import { Link } from "react-router-dom";

const types = [
  "Normal", "Fighting", "Flying", "Poison", "Ghost", "Rock", "Bug", "Ground", "Steel", "Fire",
  "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"
];

function Pokedex() {
  const [cardKey, setCardKey] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]); 
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/pokemons", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setPokemonList(response.data);
        setFilteredPokemonList(response.data);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des Pokémon :", err);
      });
  }, []);

  //console.log("pokemonList", pokemonList);
  //console.log("filteredPokemonList", filteredPokemonList);
  
  useEffect(() => {
    const filteredPokemons = pokemonList.filter((p) =>
      p.name.french.toLowerCase().includes(search.toLowerCase()) &&
      (selectedTypes.length === 0 || selectedTypes.every(type => p.type.includes(type)))
    );
    setFilteredPokemonList(filteredPokemons);
  }, [search, selectedTypes, pokemonList]); 

  return (
    <div >
      <div>
        <div>
          <Menu />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <SearchBar 
            search={search}
            setSearch={setSearch}
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            types={types}
          />
        </div>

        <div style={{ backgroundColor: "grey", borderRadius: "12px", padding: "20px", display: "flex", justifyContent: "center", width: "75%", margin: "auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              maxHeight: "410px",
              overflowY: "scroll",
            }}
          >
            {filteredPokemonList.map((p) => (
              <Link to={`/pokedex/pokemon/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div key={p.id}>
                <Cards
                  p = {p}
                  //name={p.name.french}
                  //type={p.type}
                  //image={p.image}
                  //hp={p.base.HP}
                  //attack={p.base.Attack}
                  //defense={p.base.Defense}
                  //speed={p.base.Speed}
                  //onClick={() => setCardKey(p.base.id)}
                />
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Pokedex;
