var express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtDecode = require('jwt-decode');
const Users = require("../models/users-models");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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

/* Login an existing user */
router.post("/login", (req, res) => {
  let { username, email, password } = req.body;

  Users.findBy(username || email)
  .first()
  .then(userFound => {
    if (!userFound) {
      res.status(404).json({ error: "We couldn't find a user with these credentials!"})
    } else {
      if (userFound && bcrypt.compareSync(password, userFound.password)) {
        const token = generateToken(userFound);
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        res.status(200).json({
          message: "You've successfully logged in!",
          userInfo: {
            id: userFound.id,
            username: userFound.username,
          },
          token: token,
          expiresAt
        })
      } else if (userFound && !bcrypt.compareSync(password, userFound.password)) {
        res.status(401).json({ message: "Invalid credentials" })
      }
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json(error);
  })
})

/* Generate a token */
function generateToken(user) {
  const { id, password } = user;

  const payload = {
    id,
    password
  };

  const secret = process.env.JWT_SECRET || "This still needs to be changed"

  const jwtOptions = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, jwtOptions);
}

module.exports = router;
