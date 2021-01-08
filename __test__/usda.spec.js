const request = require("supertest");
const server = require("../server.js");

describe("GET request to /api/usda/genera", () => {
  it("should return an array of unique genera", async () => {
    const result = await request(server).get("/api/usda/genera");
    expect(result.body.genera).toContain("Achlys");
    expect(result.body.genera.length).toBeGreaterThan(500);
  });
});

describe("GET request to /api/usda/:genus/species", () => {
  it("should return an array of unique species belonging to the specified genus", async () => {
    const result = await request(server).get("/api/usda/Achlys/species");
    expect(result.body.species[0]).toStrictEqual({
      Species: "californica",
      id: 360,
    });
    expect(result.body.species.length).toBeGreaterThan(1);
  });
});

describe("GET request to /api/usda/:id", () => {
  it("should return the complete plant data associated with the specified id", async () => {
    const result = await request(server).get("/api/usda/360");
    expect(result.body.plant.Species).toBe("californica");
  });
});

describe("GET request to /api/usda/search?commonName=queryString", () => {
  it("should return first twenty search results and pagination data", async () => {
    const result = await request(server).get(
      "/api/usda/search?commonName=flor&offset=0"
    );
    expect(result.body.results.length).toBe(10);
    expect(result.body.pagination.limit).toBe(10);
  });
});

describe("GET request to /api/usda/filtered-search?commonName=queryString", () => {
  it("should return array of search results only if the results contain values for precipitation, soil, and root data", async () => {
    const result = await request(server).get("/api/usda/filtered-search?commonName=flor");
    expect(result.body.result).toBe("zero qualifying results");
    const result2 = await request(server).get("/api/usda/filtered-search?commonName=virg");
    expect(parseFloat(result2.body.result.Precipitation_Minimum)).toBeGreaterThan(0);
  })
})
/*
  "pagination": {
    "offset": 20,
    "limit": 10,
    "total": 3465,
  },
  "data": [

*/
