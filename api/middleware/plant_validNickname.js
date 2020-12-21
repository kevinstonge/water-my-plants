module.exports = (req, res, next) => {
    if (req.body.nickname && req.body.nickname.length > 0) {
        req.validatedPlantInput = req.validatedPlantInput || {};
        req.validatedPlantInput.nickname = req.body.nickname
    }
    next();
}