const express = require("express");
const server = express();
server.use(express.json());
server.use(require("cors")());
server.use(require("helmet")());

server.get("/", (req, res) => {
  res.status(200).json({ message: "server online!" });
});

server.use("/api/users", require("./api/users/user-router.js"));

module.exports = server;
