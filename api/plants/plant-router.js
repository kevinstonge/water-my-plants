const router = require('express').Router();
const Plants = require("./plant-model.js");
const validPlantAttributes = [require('../middleware/plant_validNickname.js'), require('../middleware/plant_validBinomial.js'), require('../middleware/plant_validWaterFrequency.js'), require('../middleware/plant_validImage.js')];

router.use('/:id', require('../middleware/plantExists.js'));

router.post('/', validPlantAttributes, async (req, res) => {
    try {
        const plant = req.validatedPlantInput;
        if (!plant.nickname || !plant.water_frequency) {
            res.status(400).json({ error: "you must provide a nickname and water_frequency for your plant" })
        }
        else {
            plant.owner_id = req.userObject.id;
            const [newPlantId] = await Plants.createPlant(plant);
            res.status(200).json({message: `successfully added ${plant.nickname} to the database`, newPlantId})
        }
    }
    catch (error) {
        res.status(500).json({ error: "unable to add the plant to the database (plant-router - 16)" });
    }
})

router.get('/', async (req, res) => {
    try {
        const plants = await Plants.getPlantByUserId(req.userObject.id);
        res.status(200).json({ plants });
    }
    catch (error) {
        res.status(500).json({error: "unable to retrieve plants from the database"})
    }
})

router.put('/:id', validPlantAttributes, async (req, res) => {
    try {
        const update = await Plants.editPlant(req.params.id, req.validatedPlantInput);
        const updatedPlant = await Plants.getPlantById(req.params.id);
        res.status(200).json({message: "update successful", updatedPlant})
    }
    catch (error) {
        res.status(500).json({error: "unable to edit the plant information in the database"})
    }
})

router.get('/:id', async (req, res) => {
    res.status(200).json({plant: req.plantObject})
})

router.delete("/:id", async (req, res) => {
    if (req.plantObject.owner_id == req.userObject.id) {
        const deletion = await Plants.deletePlant(req.plantObject.id);
        res.status(200).json({message: `plant (id: ${req.plantObject.id}) deleted!`})
    }
    else {
        res.status(401).json({ error: "don't touch! that plant does not belong to you!" });
    }
})
module.exports = router;

/*
plants table:
id
nickname
binomial (optional)
water_frequency
image (optional)
owner_id
*/