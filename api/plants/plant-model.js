const db = require("../../data/dbConfig.js");

const createPlant = async (plantObject) => {
    return await db('plants').insert(plantObject);
}

const getPlantByUserId = async (userId) => {
    return await db('plants').where({ owner_id: userId });
}

module.exports = { createPlant, getPlantByUserId }