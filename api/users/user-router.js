const router = require("express").Router();
const Users = require("./user-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegistrationInput = require("../middleware/validateRegistrationInput");
const validToken = require('../middleware/validToken.js');
const dbConfig = require("../../data/dbConfig.js");
router.post("/register", validateRegistrationInput, async (req, res) => {
  try {
    const { username, phone, password } = req.body;
    if (req.userObject && req.userObject.username === username) {
      res.status(400).json({ error: "that username already exists" });
    } else {
      const hash = bcrypt.hashSync(password);
      const newUserObject = { username, phone, password: hash };
      const newUserId = await Users.createUser(newUserObject);
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res
        .status(201)
        .json({ message: "registration successful", newUserId, token });
    }
  } catch (error) {
    res.status(500).json({
      error:
        "an unknown error occurred while attempting to create the user, see serverErrorMessage for more details",
      serverErrorMessage: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.getUserByUsername(username);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.status(200).json({ message: "login successful", token });
      } else {
        res.status(401).json({ error: "incorrect password" });
      }
    } else {
      res.status(400).json({ error: "username does not exist" });
    }
  } catch (error) {
    res.status(500).json({
      error: "server error, see serverErrorMessage for more details",
      serverErrorMessage: error,
    });
  }
});

router.get('/', validToken, async (req, res) => {
  const username = req.user.username;
  try {
    const userDetails = await Users.getUserByUsername(username);
    res.status(200).json({ username: userDetails.username, phone: userDetails.phone })
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "error retrieving user information", errorMessage: error })
  }
});

router.put('/password', [validToken, require('../middleware/usernameExists.js')], async (req, res) => {
  const username = req.authenticatedUsername;
  const { password, newPassword } = req.body;
  try {
    if (bcrypt.compareSync(password, req.userObject.password)) {
      if (newPassword) {
        const hash = bcrypt.hashSync(newPassword);
        const updatePassword = await Users.updatePassword({ username, password: hash });
        res.status(200).json({ message: "successfully changed password" })
      }
      else {
        res.status(400).json({ error: "password not changed, no new password was provided" })
      }
    }
    else {
      res.status(401).json({ error: "incorrect password" })
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ error: "unable to change password", serverErrorMessage: JSON.stringify(error) })
  }
});

router.put('/phone', [validToken, require('../middleware/usernameExists.js')], async (req, res) => {
  const username = req.authenticatedUsername;
  const { phone, newPhone } = req.body;
  try {
    res.status(200).json({message: "placeholder success message"})
  }
  catch (error) {
    res.status(500).json({error: "placeholder error message"})
  }
})

module.exports = router;
