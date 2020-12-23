require('dotenv').config();
const server = require('./server.js');
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => { console.log(`listening on ${PORT}`) });

const plantdb = require("./data/usdaDbConfig.js");
plantdb('usda').where({ id: 10 }).then(d=>console.log(d)).catch(e=>console.log(e));