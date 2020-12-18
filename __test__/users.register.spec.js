const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
beforeAll(() => {
  return db("users").truncate();
});

const userRegInput = require("./userInfo.js");

describe("POST request to /api/users/register given incomplete input", () => {
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

describe("POST request to /api/users/register given invalid input", () => {
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

describe("POST request to /api/users/register given valid input", () => {
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