const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
const bcrypt = require('bcryptjs');
const userRegInput = require("./userInfo.js");

beforeAll(async () => {
    const truncation = await db('users').truncate();
    const hash = bcrypt.hashSync(userRegInput[0].password);
    const newUserObject = { username: userRegInput[0].username, phone: userRegInput[0].phone, password: hash };
    return await db('users').insert(newUserObject);
});

describe("POST request to /api/users/login given valid credentials", () => {
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

describe("POST request to /api/users/login given invalid credentials", () => {
    it("should respond with a message indicating that the username does not exist if username does not exist", async () => {
        const result = await request(server)
            .post("/api/users/login")
            .send(userRegInput[1]);
        expect(result.body.error).toBe("username does not exist");
        expect(result.status).toBe(400);
    });
    it("should respond with a message indicating that the password is incorrect if the password is incorrect", async () => {
        const result = await request(server)
            .post("/api/users/login")
            .send({ ...userRegInput[0], password: "fdsa" });
        expect(result.body.error).toBe("incorrect password");
        expect(result.status).toBe(401);
    });
});
