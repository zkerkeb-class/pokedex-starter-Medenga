import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "../Menu";
import axios from "axios";

function NewCard() {
    const types = [
        "Normal", "Fighting", "Flying", "Poison", "Ghost", 
        "Rock", "Bug", "Ground", "Steel", "Fire", 
        "Water", "Grass", "Electric", "Psychic", "Ice", 
        "Dragon", "Dark", "Fairy"
    ];

    const [errors, setErrors] = useState({});
    const [nom, setNom] = useState('');
    const [name, setName] = useState({
        english: "",
        japanese: "",
        chinese: "",
        french: ""
    });
    const [type1, setType1] = useState("");
    const [type2, setType2] = useState("");
    const filteredTypes2 = types.filter((t) => t !== type1);
    const [hp, setHp] = useState('');
    const [attack, setAttack] = useState('');
    const [defense, setDefense] = useState('');
    const [speed, setSpeed] = useState('');
    const [image, setImage] = useState(null);
    const [spattack, setSpattack] = useState('');
    const [spdefense, setSpdefense] = useState('');
    const [id, setId] = useState(0);

    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/pokemons", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                const pokemons = response.data;
                if (pokemons.length > 0) {
                    const lastPokemon = pokemons[pokemons.length - 1];
                    setId(lastPokemon.id + 1);
                }
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des Pokémon :", err);
            });
    }, []);

    useEffect(() => {
        setName({
            english: nom,
            japanese: nom,
            chinese: nom,
            french: nom
        });
    }, [nom]);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        let newErrors = {};
      
        if (!image) {
          alert("Aucune image sélectionnée");
          return;
        }
      
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(image.type)) {
          alert("Seules les images JPG ou PNG sont autorisées !");
          return;
        }
      
        if (!nom) {
          alert("Nom du Pokémon manquant");
          return;
        }
      
        if (!type1 || type1 === "Sélectionnez un type") {
          alert("Veuillez sélectionner au moins un type valide !");
          return;
        }
      
        if (!hp || isNaN(hp) || Number(hp) <= 0) newErrors.hp = "HP doit être un nombre positif.";
        if (!attack || isNaN(attack) || Number(attack) <= 0) newErrors.attack = "L'attaque doit être un nombre positif.";
        if (!defense || isNaN(defense) || Number(defense) <= 0) newErrors.defense = "La défense doit être un nombre positif.";
        if (!speed || isNaN(speed) || Number(speed) <= 0) newErrors.speed = "La rapidité doit être un nombre positif.";
        if (!spattack || isNaN(spattack) || Number(spattack) <= 0) newErrors.spattack = "L'attaque spéciale doit être un nombre positif.";
        if (!spdefense || isNaN(spdefense) || Number(spdefense) <= 0) newErrors.spdefense = "La défense spéciale doit être un nombre positif.";
      
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      
        setErrors({});
      
        const base = {
          HP: Number(hp),
          Attack: Number(attack),
          Defense: Number(defense),
          Speed: Number(speed)
        };
      
        const Sp = {
          Attack: Number(spattack),
          Defense: Number(spdefense)
        };
      
        const types = [type1];
        if (type2) types.push(type2);
      
        const newPokemon = {
          id: id,
          name: {
            english: nom,
            japanese: nom,
            chinese: nom,
            french: nom
          },
          type: types,
          base: base,
          Sp: Sp
        };
      
        const formData = new FormData();
        formData.append("pokemon", JSON.stringify(newPokemon));
        formData.append("image", image);
      
        try {
          const response = await axios.post("http://localhost:3000/api/pokemons", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`
            }
          });
          console.log("Pokémon créé avec succès :", response.data);
          alert("Pokémon créé avec succès !");
          window.location.reload();
        } catch (err) {
          console.error("Erreur lors de la création du Pokémon :", err);
          if (err.response) {
            console.error("Détails de l'erreur:", err.response.data);
          }
        }
    };
      

    return (
        <div>
            <Menu />
            <div>
                <form onSubmit={handleSubmit}>
                    <h1>Créer votre pokémon</h1>

                    <div style={{ margin: "5px" }}>
                        <label>Nom</label><br />
                        <input required type="text" onChange={(e) => setNom(e.target.value)} /><br />
                    </div>

                    <div style={{ margin: "5px" }}>
                        <label>Type(s) (2 max)</label><br />
                        <select
                            value={type1}
                            onChange={(e) => {
                                setType1(e.target.value);
                                if (e.target.value === type2) {
                                    setType2("");
                                }
                            }}
                            style={{ margin: "5px" }}
                        >
                            <option value="">Sélectionnez un type</option>
                            {types.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>

                        <select
                            value={type2}
                            onChange={(e) => setType2(e.target.value)}
                            style={{ margin: "5px" }}
                        >
                            <option value="">Sélectionnez un second type</option>
                            {filteredTypes2.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ margin: "5px" }}>
                        <label>Image</label><br />
                        <input required accept="image/png, image/jpeg" type="file" onChange={(e) => setImage(e.target.files[0])} /><br />
                        
                        <label>HP</label><br />
                        {errors.hp && <p style={{ margin: "0%", fontSize: "8px", color: "red" }}>{errors.hp}</p>}
                        <input required type="text" onChange={(e) => setHp(e.target.value)} /><br />
                        
                        <label>Attaque</label><br />
                        {errors.attack && <p style={{ margin: "0%", fontSize: "8px", color: "red" }}>{errors.attack}</p>}
                        <input required type="text" onChange={(e) => setAttack(e.target.value)} /><br />
                        
                        <label>Défense</label><br />
                        {errors.defense && <p style={{ margin: "0%", fontSize: "8px", color: "red" }}>{errors.defense}</p>}
                        <input required type="text" onChange={(e) => setDefense(e.target.value)} /><br />
                        
                        <label>Rapidité</label><br />
                        {errors.speed && <p style={{ margin: "0%", fontSize: "8px", color: "red" }}>{errors.speed}</p>}
                        <input required type="text" onChange={(e) => setSpeed(e.target.value)} /><br />
                        
                        <label>Attaque spéciale</label><br />
                        {errors.spattack && <p style={{ margin: "0%", fontSize: "8px", color: "red" }}>{errors.spattack}</p>}
                        <input required type="text" onChange={(e) => setSpattack(e.target.value)} /><br />
                        
                        <label>Défense spéciale</label><br />
                        {errors.spdefense && <p style={{ margin: "0%", fontSize: "8px", color: "red" }}>{errors.spdefense}</p>}
                        <input required type="text" onChange={(e) => setSpdefense(e.target.value)} /><br />
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
                                cursor: "pointer"
                            }}
                        >
                            Créer la carte
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewCard;
