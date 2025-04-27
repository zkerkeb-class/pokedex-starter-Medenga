import React from "react";

const SearchBar = ({ search, setSearch, selectedTypes, setSelectedTypes, types }) => {
  const handleTypeChange = (type) => {
    setSelectedTypes(prevSelectedTypes => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter(t => t !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };
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

  return (
    <div>
      <form style={{ margin: "20px" }} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Recherchez par nom"
          style={{ padding: "5px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      <div style={{ marginTop: "20px" }}>
        <label>Filtrer par type :</label>
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          {types.map((type, index) => (
            <button
              key={index}
              id={type}
              onClick={() => handleTypeChange(type)}
              style={{
                margin: "5px",
                padding: "8px 16px",
                backgroundColor: selectedTypes.includes(type) ? typeColors[type] : "gray",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;