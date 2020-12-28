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
        if (req.query && req.query.commonName) {
            if (req.query.commonName.length > 3) {
                const offset = (req.query.offset && req.query.offset >= 0) ? req.query.offset : 0;
                const { results, totalResults } = await Usda.searchByCommonName(req.query.commonName, offset);
                res.status(200).json({ results, totalResults, offset });
            }
            else {
                res.status(400).json({ error: "query must contain at least 4 characters" });
            }
        }
        else {
            res.status(400).json({error: "missing query: /search?commonName=query"})
        }
    }
    catch (error) {
        console.log(error);
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