const request = require("supertest");
const server = require("../server.js");
const db = require("../data/dbConfig.js");
const jwt = require('jsonwebtoken');
const userCredentials = require("./userInfo.js");
const populateUsers = require('./populateUsers.js');
beforeAll(async () => {
    const truncation = await db('users').truncate();
    return await populateUsers(userCredentials);
});

describe("GET request to /api/users/",()=>{
    it("given valid jwt should return username and phone number for the user",async()=>{
        const login = await request(server).post("/api/users/login").send(userCredentials[0]);
        const result = await request(server).get('/api/users').send(userCredentials[0]).set('Authorization', `Bearer ${login.body.token}`);
        expect(result.status).toBe(200)
        expect(result.body.username).toBe(userCredentials[0].username);
        expect(result.body.phone).toBe(userCredentials[0].phone);
    });
    it("given invalid jwt should return 401",async()=>{
        const result = await request(server).get('/api/users').send(userCredentials[0]).set('Authorization', `Bearer badtok3n`);
        expect(result.status).toBe(401);
    })
    it("given no jwt should return 401",async()=>{
        const result = await request(server).get('/api/users').send(userCredentials[0]);
        expect(result.status).toBe(401);
    })
})