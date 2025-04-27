import { color, m } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Auth() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // reset message
    
        try {
          const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
          });
    
          const data = await response.json();
          if (response.ok) {
            localStorage.setItem("token", data.token);
            setMessage("Connexion réussie !");
            navigate("/apropos");
          } else {
            setMessage(data.message || "Échec de la connexion");
          }
        } catch (error) {
          setMessage("Erreur lors de la connexion");
          console.error(error);
        }
    };
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const pageStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    fontFamily: "'Press Start 2P', system-ui",
    padding: "20px",
    position: "relative",
    opacity: 1,
  };


  const screenStyle = {
    background: "#2e2e2e",
    border: "10px solid #000",
    padding: "30px",
    borderRadius: "20px",
    boxShadow:
      "0px 0px 0px 5px #111 inset, 0px 0px 50px #000000aa",
    position: "relative",
    maxWidth: "480px",
    margin: "auto",
  };

  const titleStyle = {
    color: "#39FF14",
    fontSize: "16px",
    textAlign: "center",
    marginBottom: "20px",
    textShadow: "0 0 3px #39FF14",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    backgroundColor: "#121212",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "inset 0 0 10px #000",
  };

  const inputStyle = {
    fontFamily: "'Press Start 2P', system-ui",
    fontSize: "10px",
    padding: "12px",
    width: "80%",
    border: "none",
    color: "#000",
    backgroundColor: "#fff",
    boxShadow:
      "0px 5px black, 0px -5px black, 5px 0px black, -5px 0px black, inset 0px 5px #ffffff36",
    textAlign: "center",
  };

  const buttonStyle = {
    color: "#fff",
    backgroundColor: "#6abc3a",
    padding: "12px 25px",
    fontSize: "12px",
    fontFamily: "'Press Start 2P', system-ui",
    border: "0",
    boxShadow:
      "0px 5px black, 0px -5px black, 5px 0px black, -5px 0px black," +
      "0px 10px #00000038, 5px 5px #00000038, -5px 5px #00000038," +
      "inset 0px 5px #ffffff36",
    cursor: "pointer",
  };

  const handleClick = (e) => {
    e.target.style.transform = "translateY(5px)";
    e.target.style.boxShadow =
      "0px 5px black, 0px -5px black, 5px 0px black, -5px 0px black, inset 0px 5px #00000038";
  };

  const handleReset = (e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow =
      "0px 5px black, 0px -5px black, 5px 0px black, -5px 0px black," +
      "0px 10px #00000038, 5px 5px #00000038, -5px 5px #00000038," +
      "inset 0px 5px #ffffff36";
  };

  const logoStyle = {
    width: "60%",
    display: "block",
    margin: "auto",
    marginTop: "5%",
    marginBottom: "5%",
  };

  const screwStyle = {
    position: "absolute",
    width: "12px",
    height: "12px",
    backgroundColor: "#000",
    borderRadius: "50%",
    boxShadow: "inset 1px 1px 3px #333",
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <style>
        {`
            @keyframes scrollBackground {
            0% {
                background-position: 0 0;
            }
            100% {
                background-position: 1000px 1000px;
            }
            }
        `}
      </style>

      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "url('/src/assets/image/pokeball.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "60px",
        filter: "grayscale(100%) opacity(0.07)",
        zIndex: 0,
        animation: "scrollBackground 30s linear infinite"
      }}></div>
  
      <div style={pageStyle}>
        <div>
          <img src="/src/assets/image/pokelogo.png" alt="Logo" style={logoStyle} />
          <div style={screenStyle}>
            <div style={{ ...screwStyle, top: "10px", left: "10px" }}></div>
            <div style={{ ...screwStyle, top: "10px", right: "10px" }}></div>
            <div style={{ ...screwStyle, bottom: "10px", left: "10px" }}></div>
            <div style={{ ...screwStyle, bottom: "10px", right: "10px" }}></div>
  
            <h1 style={titleStyle}>Connexion</h1>
            <p style={{ fontSize: "10px" }}>Si vous souhaitez accéder au Pokedex, il vous faut un compte. Si vous n'en avez pas, créez en un <Link to="/register">ici</Link>!</p>
  
            <form style={formStyle} onSubmit={handleLogin}>
              <input type="text" placeholder="Email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Mot de passe" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} />
              <button
                type="submit"
                style={buttonStyle}
                onMouseDown={handleClick}
                onMouseUp={handleReset}
              >
                Se connecter
              </button>
             {message && <p>{message}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Auth;
