const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
const userCredentials = require("./userInfo.js");
const populateUsers = require('./populateUsers.js');
beforeAll(async () => {
    const truncation = await db('users').truncate();
    return await populateUsers(userCredentials);
});
describe("PUT request to /api/users/phone given valid credentials",()=>{
    it("should respond with status 200 and success message",async()=>{
        const login = await request(server).post("/api/users/login").send(userCredentials[0]);
        const result = await request(server).put('/api/users/phone').send({"phone":"123-456-7890"}).set('Authorization', `Bearer ${login.body.token}`);
        expect(result.status).toBe(200);
    });
});
describe("PUT request to /api/users/phone given invalid credentials",()=>{
    it("should respond with 401 if provided no token",async()=>{
        const result = await request(server).put('/api/users/phone').send({"phone":"123-456-7890"});
        expect(result.status).toBe(401);
    });
    it("should respond with 401 if provided invalid token",async()=>{
        const result = await request(server).put('/api/users/phone').send({"phone":"123-456-7890"}).set('Authorization', "Bearer badtok3n");
    });
});