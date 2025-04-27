import React, { useState, useEffect } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./App.css";
import Card from "./Card";
import Pokedex from "./Pokedex";
import APropos from "./APropos";
import NewCard from "./NewCard";
import Auth from "./Auth";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext"; 
import Tournament from "./Tournament";  
import NotFound from './NotFound';

import axios from "axios";

const types = [
  "Normal", "Fighting", "Flying", "Poison", "Ghost", "Rock", "Bug", "Ground", "Steel", "Fire", "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon", "Dark", "Fairy"
];

function App() {

  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
              <Route
                path="/pokedex"
                element={
                  <PrivateRoute>
                    <Pokedex />
                  </PrivateRoute>
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <APropos />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pokedex/pokemon/:id"
                element={
                  <PrivateRoute>
                    <Card />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pokedex/pokemon/new"
                element={
                  <PrivateRoute>
                    <NewCard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/pokedex/tournament"
                element={
                  <PrivateRoute>
                    <Tournament/>
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<PrivateRoute><NotFound /></PrivateRoute>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
