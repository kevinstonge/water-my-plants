const router = require('express').Router();
const Plants = require("./plant-model.js");

router.post('/', async (req, res) => {
    try {
        const { nickname, binomial = "", water_frequency, image = "" } = req.body;
        if (!nickname || !water_frequency) {
            res.status(400).json({ error: "you must provide a nickname and water_frequency for your plant" })
        }
        else {
            const owner_id = req.userObject.id;
            const [newPlantId] = await Plants.createPlant({ nickname, binomial, water_frequency, image, owner_id });
            res.status(200).json({message: `successfully added ${nickname} to the database`, newPlantId})
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

router.put('/:id', async (req, res) => {
    try {
        const plantId = req.params.id;
        const userId = req.userObject.id;
        const plant = await Plants.getPlantById(plantId);
        if (plant.owner_id == userId) {
            //create then pass object containing values to update
            const { nickname = undefined, binomial = undefined, water_frequency = undefined, image = undefined } = req.body;
            if (nickname === "") {
                res.status(400).json({ message: "nickname cannot be changed to an empty string" })
            }
            else if (parseFloat(water_frequency) > 0) {
                res.status(400).json({message: "water frequency must be a number and be greater than zero"})
            }
            else {
                const update = Plants.editPlant(plantId,
                    {
                        nickname, binomial, water_frequency, image
                    });
                res.status(200).json({update});
            }
        }
        else {
            res.status(401).json({error: `don't touch! that plant does not belong to you!`})
        }
    }
    catch (error) {
        res.status(500).json({error: "unable to edit the plant information in the database"})
    }
})

router.get('/:id', async (req, res) => {
    const plant = await Plants.getPlantById(req.params.id)
    res.status(200).json({plant})
})

router.delete("/:id", async (req, res) => {
    const plantId = req.params.id;
    const userId = req.userObject.id;
    const plant = await Plants.getPlantById(plantId);
    if (plant.owner_id == userId) {
        const deletion = await Plants.deletePlant(plantId);
        res.status(200).json({message: "plant deleted!"})
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