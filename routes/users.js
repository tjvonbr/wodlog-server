var express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require('jwt-decode');
const Users = require("../models/users-models");
var router = express.Router();

/* Register a new user */
router.post("/register", async (req, res) => {
  try {
    let user = req.body;

    const hash = await bcrypt.hashSync(user.password, 14);
    user.password = hash

    Users.add(user)
    .then(newUser => {
      const token = generateToken(newUser);
      const decodedToken = jwtDecode(token);
      const expiresAt = decodedToken.exp;

      res.status(201).json({
        message: "You've successfully registered!",
        userInfo: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.password
        },
        token,
        expiresAt
      })
    })
  } catch(error) {
    console.log(error);
    res.status(500).json(error);
  };
})

module.exports = router;
