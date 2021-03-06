const db = require("../../data/dbConfig.js");

const createPlant = async (plantObject) => {
    return await db('plants').insert(plantObject).returning('id');
}

const getPlantById = async (id) => {
    return await db('plants').where({ id }).first();
}

const getPlantByUserId = async (userId) => {
    return await db('plants').where({ owner_id: userId });
}

const editPlant = async (id, updateObject) => {
    return await db('plants')
        .update(updateObject)
        .where({ id })
}

const deletePlant = async (id) => {
    return await db('plants').delete().where({id})
}

module.exports = { createPlant, getPlantByUserId, getPlantById, editPlant, deletePlant }