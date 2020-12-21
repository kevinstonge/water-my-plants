module.exports = (req, res, next) => {
    if (req.body.binomial && req.body.binomial.length > 0) {
        req.validatedPlantInput = req.validatedPlantInput || {};
        req.validatedPlantInput.binomial = req.body.binomial
    }
    next();
}