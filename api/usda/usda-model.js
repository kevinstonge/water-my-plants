const plantdb = require("../../data/usdaDbConfig.js")

const getAllGenera = async () => {
    try {
        return await plantdb('usda').distinct('Genus');
    }
    catch (error) {
        console.log("usda-model-8")
        res.status(500).json({error: "error retrieving genera from database"})
        throw error;
    }
}

const getSpeciesInGenus = async (genus) => {
    try {
        return await plantdb('usda').select('Species','id').where({ Genus: genus });
    } 
    catch (error) {
        console.log("usda-model-19");
        res.status(500).json({ error: "error retrieving species list from database" })
        throw error;
    }
}

const getPlantById = async (id) => {
    try {
        return await plantdb('usda').where({ id }).first();
    }
    catch (error) {
        res.status(500).json({error: `error retrieving plant (id: ${id}) from the database`})
        throw error;
    }
}

const searchByCommonName = async (query) => {
    //Common_Name
    try {
        return await plantdb('usda').where('Common_Name', 'like', `%${query}%`)
    }
    catch (error) {
        res.status(500).json({error: `error querying the database`})
    }
}

module.exports = { getAllGenera, getSpeciesInGenus, getPlantById, searchByCommonName }