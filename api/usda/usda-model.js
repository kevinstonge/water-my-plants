const plantdb = require("../../data/usdaDbConfig.js");

const getAllGenera = async () => {
  try {
    return await plantdb("usda").distinct("Genus");
  } catch (error) {
    console.log("usda-model-8");
    throw error;
  }
};

const getSpeciesInGenus = async (genus) => {
  try {
    return await plantdb("usda")
      .select("Species", "id")
      .where({ Genus: genus });
  } catch (error) {
    console.log("usda-model-19");
    throw error;
  }
};

const getPlantById = async (id) => {
  try {
    return await plantdb("usda").where({ id }).first();
  } catch (error) {
    throw error;
  }
};

const searchByCommonName = async (queryObject) => {
  //Common_Name
  const { query } = queryObject;
  let { limit, offset } = queryObject;
  if (limit > 100) {
    limit = 100;
  }
  try {
    const results = () =>
      plantdb("usda").where("Common_Name", "like", `%${query}%`);
    const totalResults = await results().count();
    if (offset > totalResults) {
      offset = totalResults - limit;
    }
    const resultsSubset = await results().limit(limit).offset(offset);
    return {
      results: resultsSubset,
      pagination: { offset, total: totalResults[0]["count(*)"], limit },
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllGenera,
  getSpeciesInGenus,
  getPlantById,
  searchByCommonName,
};
