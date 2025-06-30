const express = require(`express`);
const cors = require('cors');
const app = express();
app.use(cors()); // Enable CORS
const PORT = 5050;
const pokedex = require('../public/pokedex.json'); // Import the JSON file

const pokemon = pokedex.pokemon;

app.use(express.json());

const typeEffectiveness = {
    Fire: { Grass: 2, Water: 0.5, Rock: 0.5 },
    Water: { Fire: 2, Grass: 0.5, Electric: 0.5 },
    Grass: { Water: 2, Fire: 0.5, Flying: 0.5 },
    Electric: { Water: 2, Ground: 0.5 },
}

// Helper function to calculate battle score
const calculateScore = (p, opponentType) => {
    const hp = p.avg_spawns; // Use avg_spawns as HP
    const attack = parseFloat(p.height.replace(' m', '')); // Use height as Attack
    const defense = parseFloat(p.weight.replace(' kg', '')); // Use weight as Defense

    // Apply type effectiveness multiplier
    let multiplier = 1;
    p.type.forEach((type) => {
        if (typeEffectiveness[type] && typeEffectiveness[type][opponentType]) {
            multiplier *= typeEffectiveness[type][opponentType];
        }
    });

    return (hp + attack + defense) * multiplier;
};

//GET ALL Pokemon
app.get('/api/pokemon', (req, res) => {
    console.log(pokedex);
    res.json(pokemon);
});


//when the frontend sends a request to this endpoint, this function runs
app.post("/api/battle", (req, res) => {

    //try to get the 2 pokemon names from the request body

    const { pokemon1, pokemon2 } = req.body;

    const p1 = pokemon.find(p => p.name === pokemon1);
    const p2 = pokemon.find(p => p.name === pokemon2);

    if (!p1 || !p2) {
        return res.status(400).json({ error: 'Invalid Pokémon name(s)' });
    }

    const score1 = calculateScore(p1, p2.type[0]); // Use opponent's first type for effectiveness
    const score2 = calculateScore(p2, p1.type[0]); // Use opponent's first type for effectiveness

    const winner = score1 > score2 ? pokemon1 : pokemon2;
    const explanation = `${winner} wins due to higher effective stats (${score1.toFixed(1)} vs ${score2.toFixed(1)})`;

    res.json({
        winner,
        explanation

    });

});

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`);
});


module.exports = app;
