const validator = require('validator');
module.exports = (req, res, next) => {
    if (req.body.water_frequency && req.body.water_frequency.length > 0) {
        if (validator.toFloat(req.body.water_frequency) >= 0) {
            req.validatedPlantInput = req.validatedPlantInput || {};
            req.validatedPlantInput.water_frequency = req.body.water_frequency
        }
        else {
            res.status(400).json({ error: "water_frequency must be a valid number" });
            return;
        }
    }
    next();
}