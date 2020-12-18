const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
beforeAll(() => {
  return db("plants").truncate();
});
describe("POST request to /api/plants/", () => {
    it("if token is missing it should respond with 401", async () => {
        const result = await request(server)
            .post("/api/plants/")
            .send({ headers: { "Authorization": "Bearer badtok3n" } });
        expect(result.status).toBe(401);
    })
})