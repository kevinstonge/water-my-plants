const plantdb = require("../../data/usdaDbConfig.js")

const getAllGenera = async () => {
    try {
        return await plantdb('usda').distinct('Genus');
    }
    catch (error) {
        console.log("usda-model-8")
        throw error;
    }
}

const getSpeciesInGenus = async (genus) => {
    try {
        return await plantdb('usda').select('Species','id').where({ Genus: genus });
    } 
    catch (error) {
        console.log("usda-model-19");
        throw error;
    }
}

const getPlantById = async (id) => {
    try {
        return await plantdb('usda').where({ id }).first();
    }
    catch (error) {
        throw error;
    }
}

const searchByCommonName = async (query, offset) => {
    //Common_Name
    try {
        const results = () => plantdb('usda').where('Common_Name', 'like', `%${query}%`);
        const resultsSubset = await results().limit(20).offset(offset);
        const totalResults = await results().count();
        return ({results: resultsSubset, totalResults: totalResults[0]['count(*)']})
    }
    catch (error) {
        throw error;
    }
}

module.exports = { getAllGenera, getSpeciesInGenus, getPlantById, searchByCommonName }