const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
const bcrypt = require('bcryptjs');
const userCredentials = require("./userInfo.js");
const populateUsers = require('./populateUsers.js');
beforeAll(async () => {
    const truncation = await db('users').truncate();
    return await populateUsers(userCredentials);
});

describe("POST request to /api/users/login given valid credentials", () => {
    it.each(userCredentials)
        ("should respond with a message confirming successful login and provide a JWT", async(user)=>{
        const result = await request(server).post("/api/users/login").send(user);
        expect(result.body.message).toContain("login successful");
        expect(result.status).toBe(200);
        expect(result.body.token).toMatch(
            /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/
        );
    })
});

describe("POST request to /api/users/login given invalid credentials", () => {
    it("should respond with a message indicating that the username does not exist if username does not exist", async () => {
        const result = await request(server)
            .post("/api/users/login")
            .send({...userCredentials[0],username:"iDoNotExist"});
        expect(result.body.error).toBe("username does not exist");
        expect(result.status).toBe(400);
    });
    it("should respond with a message indicating that the password is incorrect if the password is incorrect", async () => {
        const result = await request(server)
            .post("/api/users/login")
            .send({ ...userCredentials[0], password: "fdsa" });
        expect(result.body.error).toBe("incorrect password");
        expect(result.status).toBe(401);
    });
});
