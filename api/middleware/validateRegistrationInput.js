const validPhone = require("./validPhone.js");
const validUsername = require("./validUsername.js");
const validPassword = require("./validPassword.js");
const usernameExists = require("./usernameExists.js");
module.exports = [validUsername, validPhone, validPassword, usernameExists];
