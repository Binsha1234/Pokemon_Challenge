// src/App.js
import React from "react";
import PokemonList from "./components/front_index";

function App() {
    return (
        <div className="App">
            <h1 style={{ textAlign: "center" }}>Pokémon Coding Challenge</h1>
            <PokemonList />
        </div>
    );
}

export default App;
