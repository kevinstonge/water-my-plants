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
            res.status(200).json({newPlantId})
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