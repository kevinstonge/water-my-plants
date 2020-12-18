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
describe("PUT request to /api/users/password given valid credentials",()=>{
    it("should respond with status 200",async()=>{
        const login = await request(server).post("/api/users/login").send(userCredentials[0]);
        const result = await request(server).put('/api/users/password').send(userCredentials[0]).set('Authorization', `Bearer ${login.body.token}`).send({"password":userCredentials[0].password,"newPassword":"newPassword"});
        expect(result.status).toBe(200);
    });
    it("should allow login with new password",async()=>{
        const login = await request(server).post("/api/users/login").send({...userCredentials[0],password:"newPassword"});
        expect(login.status).toBe(200);
    });
});
describe("PUT request to /api/users/password given invalid credentials",()=>{
    it("should respond with 401 if provided no token",async()=>{
        const result = await request(server).put('/api/users/password').send({"password":userCredentials[0].password,"newPassword":"newPassword"});
        expect(result.status).toBe(401);
    });
    it("should respond with 401 if provided invalid token",async()=>{
        const result = await request(server).put('/api/users/password').send(userCredentials[0]).set('Authorization', `Bearer badtok3n`).send({"password":userCredentials[0].password,"newPassword":"newPassword"});
    });
    it("should respond with 401 if original password provided is incorrect",async()=>{
        const login = await request(server).post("/api/users/login").send(userCredentials[0]);
        const result = await request(server).put('/api/users/password').send(userCredentials[0]).set('Authorization', `Bearer ${login.body.token}`).send({"password":"incorrectPassword","newPassword":"newPassword"});
        expect(result.status).toBe(401);
    })
});