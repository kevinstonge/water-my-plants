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


const filteredSearchByCommonName = async (query) => {
  /*
  only return results that have values for all of the following:
  Adapted_to_Coarse_Textured_Soils
  Adapted_to_Medium_Textured_Soils
  Adapted_to_Fine_Textured_Soils
  Precipitation_Minimum
  Precipitation_Maximum
  Root_Depth_Minimum_inches
  */
  try {
    const result = await plantdb("usda")
      .where("Common_Name", "like", `%${query}%`)
      .whereIn("Adapted_to_Coarse_Textured_Soils", ["Yes", "No"])
      .whereIn("Adapted_to_Medium_Textured_Soils", ["Yes", "No"])
      .whereIn("Adapted_to_Fine_Textured_Soils", ["Yes", "No"])
      .where("Precipitation_Minimum", ">", "-1")
      .where("Precipitation_Maximum", ">", "0")
      .where("Root_Depth_Minimum_inches", ">", "-1")
      .first();
    if (result) { return result } else { return "zero qualifying results" }
  }
  catch (error) {
    throw error;
  }
}


module.exports = {
  getAllGenera,
  getSpeciesInGenus,
  getPlantById,
  searchByCommonName,
  filteredSearchByCommonName
};
