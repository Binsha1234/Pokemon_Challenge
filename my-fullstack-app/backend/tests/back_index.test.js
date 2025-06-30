const app = require("../src/back_index");
const request = require('supertest');

describe("/api/battle API endpoint", () => {
    it("should return the expected outcome for valid pokemon names", async () => {
        const response = await request(app)
            .post("/api/battle")
            .send({
                pokemon1: "Bulbasaur",
                pokemon2: "Ivysaur"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("winner");
        expect(response.body).toHaveProperty("explanation");
        expect(typeof response.body.winner).toBe("string"); // Ensure 'winner' is a string
        expect(typeof response.body.explanation).toBe("string"); // Ensure 'explanation' is a string
    });
    it("should return a 400 status code for invalid Pokémon names", async () => {
        const response = await request(app)
            .post("/api/battle")
            .send({
                pokemon1: "InvalidPokemon",
                pokemon2: "Ivysaur"
            });
        console.log("Response Status:", response.status);
        expect(response.status).toBe(400); // Ensure the status code is 400
    });

    it("should return a 400 status code if no Pokémon names are provided", async () => {
        const response = await request(app)
            .post("/api/battle")
            .send({});

        expect(response.status).toBe(400); // Ensure the status code is 400
    });


    it("should return the correct winner based on stats", async () => {
        const response = await request(app)
            .post("/api/battle")
            .send({
                pokemon1: "Bulbasaur",
                pokemon2: "Ivysaur"
            });

        expect(response.status).toBe(200);
        expect(response.body.winner).toBe("Bulbasaur"); // Bulbasaur has higher stats than Bulbasaur
        expect(response.body.explanation).toContain("Bulbasaur wins"); // Explanation should mention Ivysaur as the winner
    });

});
