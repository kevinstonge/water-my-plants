const router = require('express').Router();
const Usda = require('./usda-model.js');

router.get('/genera', async (req, res) => {
    try {
        const genera = await Usda.getAllGenera();
        res.status(200).json({genera: genera.map(g=>g.Genus)});
    }
    catch (error) {
        console.log('usda-router-10')
        res.status(500).json({error: "error getting list of plant genera"})
    }
})

router.get('/:genus/species', async (req, res) => {
    try {
        const species = await Usda.getSpeciesInGenus(req.params.genus)
        res.status(200).json({ species: species });
    }
    catch (error) {
        console.log('usda-router-22');
        res.status(500).json({ error: "error getting list of plant species" })
    }
});

router.get('/search/', async (req, res) => {
    try {
        console.log(req.query);
        const results = await Usda.searchByCommonName(req.query.commonName);
        console.log(results);
        res.status(200).json({ results: results });
    }
    catch (error) {
        res.status(500).json({error: "error performing the requested query"})
    }
})

router.get('/:id', async (req, res) => {
    try {
            const plant = await Usda.getPlantById(req.params.id);
            res.status(200).json({ plant })
        }
        catch (error) {
            console.log('usda-router-32');
            res.status(500).json({ error: "error getting information about that plant" })
        }
})



module.exports = router;