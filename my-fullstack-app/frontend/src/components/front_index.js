import React, { useEffect, useState } from "react";

function PokemonList() {
    const [pokemon, setPokemonData] = useState([]); // State for Pokémon list
    const [selectedPokemon, setSelectedPokemon] = useState([]); // State for selected Pokémon
    const [battleResult, setBattleResult] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5050/api/pokemon')
            .then(res => res.json())
            .then(data => {
                console.log("Fetched Pokémon data:", data);
                setPokemonData(data);
            })
            .catch(err => console.error("Error fetching Pokémon data:", err));
    }, []);

    const handleSelect = (p) => {
        // Add or remove Pokémon from the selected list
        if (selectedPokemon.includes(p)) {
            setSelectedPokemon(selectedPokemon.filter((selected) => selected !== p));
        } else if (selectedPokemon.length < 2) {
            setSelectedPokemon([...selectedPokemon, p]);
        }
    };

    const startBattle = () => {

        if (selectedPokemon.length === 2) {

            fetch("http://localhost:5050/api/battle", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    pokemon1: selectedPokemon[0],
                    pokemon2: selectedPokemon[1]
                })
            })
                .then(res => res.json())
                .then(data => {
                    setBattleResult({
                        gamewinner: data.winner,
                        summary: data.explanation
                    });
                })

        } else {
            alert("please select exactly 2 pokemon")
        }

    };

    return (
        <div>

            <div style={{ position: "sticky", top: "0", backgroundColor: "#f9f9f9", padding: "10px", borderBottom: "1px solid #ccc" }}>
                <h3>Battle Preview:</h3>
                {selectedPokemon.length === 2 ? (
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                        <div style={{ textAlign: "center" }}>
                            <img
                                src={pokemon.find(p => p.name === selectedPokemon[0]).img}
                                alt={selectedPokemon[0]}
                                style={{ width: "100px", height: "100px", objectFit: "contain" }}
                            />
                            <p><strong>{selectedPokemon[0]}</strong></p>
                        </div>
                        <h3 style={{ margin: "0 20px" }}>VS</h3>
                        <div style={{ textAlign: "center" }}>
                            <img
                                src={pokemon.find(p => p.name === selectedPokemon[1]).img}
                                alt={selectedPokemon[1]}
                                style={{ width: "100px", height: "100px", objectFit: "contain" }}
                            />
                            <p><strong>{selectedPokemon[1]}</strong></p>
                        </div>
                    </div>
                ) : selectedPokemon.length > 0 ? (
                    <p>Please select exactly 2 Pokémon for the battle.</p>
                ) : (
                    <p>No Pokémon selected</p>
                )}
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                    onClick={startBattle}
                    style={{
                        cursor: "pointer",
                        padding: "5px 10px",
                        margin: "5px",
                        backgroundColor: "#4CAF50",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        fontSize: "18px",
                        fontWeight: "bold"
                    }}
                > start game
                </button>
            </div>
            {battleResult && (
                <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
                    <h3>Battle Result</h3>
                    <p><strong>Winner:</strong> {battleResult.gamewinner}</p>
                    <p><strong>Summary:</strong> {battleResult.summary}</p>

                </div>
            )}
            <h2 style={{ textAlign: "center" }}>Pokémon Characters  are:</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                {Array.isArray(pokemon) ? (
                    pokemon.map((p) => (
                        <div key={p.id} style={{ textAlign: "center", border: "1px solid #ccc", borderRadius: "10px", padding: "10px" }}>
                            <img
                                src={p.img}
                                alt={p.name}
                            />
                            <button
                                onClick={() => handleSelect(p.name)}
                                style={{
                                    backgroundColor: selectedPokemon.includes(p.name) ? "lightblue" : "white",
                                    cursor: "pointer",
                                    padding: "5px 10px",
                                    marginTop: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px"
                                }}
                            >
                                {p.name}
                            </button>
                        </div>
                    ))
                ) : (
                    <li>No Pokémon list available</li>
                )}
            </div>

        </div>
    );
}

export default PokemonList;
