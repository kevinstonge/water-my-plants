const express = require("express");
const server = express();
server.use(express.json());
server.use(require("cors")());
server.use(require("helmet")());

server.get("/", (req, res) => {
  res.status(200).json({ message: "server online!" });
});

server.use("/api/users", require("./api/users/user-router.js"));

server.use("/api/plants", require("./api/middleware/validToken.js")); //only allow access to /api/plants if the user has logged in and received a token
server.use("/api/plants", require("./api/middleware/usernameExists.js")); //this verifies that the username decoded from the token is an existing user, and also adds the user object from the database to req.userObject (includes password hash, id, phone, username)
server.use("/api/plants", require("./api/plants/plant-router.js"));

server.use("/api/usda", require("./api/usda/usda-router.js"));

module.exports = server;

