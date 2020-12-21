const validator = require('validator');
module.exports = (req, res, next) => {
    if (req.body.image && req.body.image.length > 0) {
        if (validator.isURL(req.body.image)) {
            req.validatedPlantInput = req.validatedPlantInput || {};
            req.validatedPlantInput.image = req.body.image
        }
        else {
            res.status(400).json({error: "please provide a valid URL for the plant's image"})
        }
    }
    next();
}