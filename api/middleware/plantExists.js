const db = require("../../data/dbConfig.js");
module.exports = async (req, res, next) => {
  try {
    const plantId = req.params.id;
    const plant = await db("plants")
      .where({ id: plantId })
      .first();
    if (plant) {
      if (plant.owner_id === req.userObject.id) {
        req.plantObject = plant;
        next();
      }
      else {
        res.status(401).json({error: "that plant doesn't belong to you"})
      }
    }
    else {
      res.status(404).json({error: `unable to located plant (id: ${plantId}) in the database`})
    }

  } catch (error) {
    res.status(500).json({
      error: "an error occurred (api/middleware/plantExists.js)",
    });
  }
};
