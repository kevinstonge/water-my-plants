const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
beforeAll(() => {
  return db("users").truncate();
});
describe("GET request to /", () => {
  it("should return message indicating that the server is online", async () => {
    const result = await request(server).get("/");
    expect(result.body.message).toBe("server online!");
  });
});

const userRegInput = require("./userInfo.js");

describe("POST request to /api/users/register", () => {
  describe("given incomplete input", () => {
    it("should respond with an error if no username is provided", async () => {
      const result = await request(server)
        .post("/api/users/register")
        .send({ ...userRegInput[0], username: "" });
      expect(result.body.error).toBe("you must provide a username");
      expect(result.status).toBe(400);
    });
    it("should respond with an error if no phone number is provided", async () => {
      const result = await request(server)
        .post("/api/users/register")
        .send({ ...userRegInput[0], phone: "" });
      expect(result.body.error).toBe("you must provide a phone number");
      expect(result.status).toBe(400);
    });
    it("should respond with an error if no password is provided", async () => {
      const result = await request(server)
        .post("/api/users/register")
        .send({ ...userRegInput[0], password: "" });
      expect(result.body.error).toBe("you must provide a password");
      expect(result.status).toBe(400);
    });
  });
  describe("given invalid input", () => {
    it("should respond with an error if the provided username is too short", async () => {
      const result = await request(server)
        .post("/api/users/register")
        .send({ ...userRegInput[0], username: "as" });
      expect(result.body.error).toContain("is too short");
      expect(result.status).toBe(400);
    });
    it("should respond with an error if an invalid phone number is provided", async () => {
      const result = await request(server)
        .post("/api/users/register")
        .send({ ...userRegInput[0], phone: "860a333-5454" });
      expect(result.body.error).toBe("you must provide a valid phone number");
      expect(result.status).toBe(400);
    });
  });
  describe("given valid input", () => {
    it("should respond with a message confirming successful registration and provide a JWT", async () => {
      const result = await request(server)
        .post("/api/users/register")
        .send(userRegInput[0]);
      expect(result.body.message).toContain("registration successful");
      expect(result.status).toBe(201);
      expect(result.body.token).toMatch(
        /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/
      );
    });
  });
});

describe("post request to /api/users/login", () => {
  describe("given valid credentials", () => {
    it("should respond with a message confirming successful login and provide a JWT", async () => {
      const result = await request(server)
        .post("/api/users/login")
        .send(userRegInput[0]);
      expect(result.body.message).toContain("login successful");
      expect(result.status).toBe(200);
      expect(result.body.token).toMatch(
        /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/
      );
    });
  });
  describe("given invalid credentials", () => {
    describe("non-existant username", async () => {
      it("should respond with a message indicating that the username does not exist", async () => {
        const result = await request(server)
          .post("/api/users/login")
          .send(userRegInput[1]);
        expect(result.body.error).toBe("username does not exist");
        expect(result.status).toBe(400);
      });
    });
    describe("incorrect password", async () => {
      it("should respond with a message indicating that the password is incorrect", async () => {
        const result = await request(server)
          .post("/api/users/login")
          .send({ ...userRegInput[0], password: "fdsa" });
        expect(result.body.error).toBe("incorrect password");
        expect(result.status).toBe(401);
      });
    });
  });
});
