const db = require("../data/dbConfig.js");
const bcrypt = require('bcryptjs');

module.exports = async (userObjects) => {
    return await userObjects.forEach(async userObject => {
        const hash = bcrypt.hashSync(userObject.password);
        const newUserObject = { username: userObject.username, phone: userObject.phone, password: hash };
        return await db('users').insert(newUserObject);    
    });
}