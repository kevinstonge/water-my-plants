const router = require('express').Router();
const Plants = require("./plant-model.js");

router.post('/', (req, res) => {
    res.status(200).json({message: "post new plant"})
})

module.exports = router;