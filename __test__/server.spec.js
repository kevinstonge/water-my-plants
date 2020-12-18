const request = require("supertest");
const server = require("../server.js");
describe("GET request to /", () => {
    it("should return message indicating that the server is online", async () => {
      const result = await request(server).get("/");
      expect(result.body.message).toBe("server online!");
    });
  });