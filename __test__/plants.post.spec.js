const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
const userCredentials = require("./userInfo.js");
const populateUsers = require('./populateUsers.js');
let userToken = "";
beforeAll(async () => {
    await db('users').truncate();
    await db('plants').truncate();
    await populateUsers(userCredentials);
    const loginResponse = await request(server).post('/api/users/login').send(userCredentials[0]);
    userToken = loginResponse.body.token
    const loginResponse2 = await request(server).post('/api/users/login').send(userCredentials[1]);
    user2Token = loginResponse2.body.token
});
describe("POST requests to /api/plants/ with bad input", () => {
    it("should respond with 400 if incomplete data is provided", async () => {
        const result = await request(server).post("/api/plants/").send({ "nickname": "george" }).set('Authorization', `Bearer ${userToken}`);
        expect(result.status).toBe(400);
    });
});

describe("POST requests to /api/plants with valid input", () => {
    it("should respond with 200 and provide newPlantId", async () => {
        const result = await request(server)
            .post("/api/plants/")
            .send({ "nickname": "george", "water_frequency": "4" })
            .set('Authorization', `Bearer ${userToken}`);
        expect(result.status).toBe(200);
        expect(result.body.newPlantId).toBe(1);

        const result2 = await request(server)
            .post("/api/plants/")
            .send({ "nickname": "george", "water_frequency": "4" })
            .set('Authorization', `Bearer ${userToken}`);
        expect(result2.status).toBe(200);
        expect(result2.body.newPlantId).toBe(2);

    });
});

describe("GET requests to /api/plants", () => {
    it("should respond with 200 and provide an array of plant objects owned by the user making the request", async () => {
        const result = await request(server)
            .get("/api/plants/")
            .set('Authorization', `Bearer ${userToken}`);
        expect(result.body.plants).toHaveLength(2);
    })
});

describe("PUT requests to /api/plants/:id", () => {
    it("should respond with an error if the plant does not belong to the user making the request", async () => {
        const result = await request(server)
            .put("/api/plants/1")
            .set("Authorization", `Bearer ${user2Token}`)
            .send({ "nickname": "tim" });
        expect(result.status).toBe(401);
    })
})