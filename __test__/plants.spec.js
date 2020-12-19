const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
beforeAll(() => {
  return db("plants").truncate();
});
describe("Unauthorized POST requests to /api/plants/", () => {
    it("should respond with 401 if token is not valid", async () => {
        const result = await request(server)
            .post("/api/plants/")
            .send({ headers: { "Authorization": "Bearer badtok3n" } });
        expect(result.status).toBe(401);
    });
    it("should respond with 401 if token is missing", async () => {
        const result = await request(server).post("/api/plants/").send({ headers: { "Authorization": "" } });
        expect(result.status).toBe(401);
    });
    it("should respond with 401 if authorization header is missing", async () => {
        const result = await request(server).post("/api/plants/");
        expect(result.status).toBe(401);
    })
})
describe("Unauthorized GET requests to /api/plants/", () => {
    it("should respond with 401 if token is not valid", async () => {
        const result = await request(server)
            .get("/api/plants/")
            .send({ headers: { "Authorization": "Bearer badtok3n" } });
        expect(result.status).toBe(401);
    });
    it("should respond with 401 if token is missing", async () => {
        const result = await request(server).get("/api/plants/").send({ headers: { "Authorization": "" } });
        expect(result.status).toBe(401);
    });
    it("should respond with 401 if authorization header is missing", async () => {
        const result = await request(server).get("/api/plants/");
        expect(result.status).toBe(401);
    });
})
