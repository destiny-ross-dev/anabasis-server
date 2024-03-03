const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const config = require("../../config");

const jwtSignUser = (user) => {
  console.log("signing user", user);
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.secrets.jwt, {
    expiresIn: ONE_WEEK,
  });
};

const signinUser = async (req, res) => {
  const db = req.app.get("db");
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await db.auth.signin(email);
    console.log(user);
    if (!user[0]) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    delete user.password;

    let token = jwtSignUser(user[0]);

    res.cookie("user", {
      token,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
    });

    res.status(200).json({ user: user[0], token });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ msg: err });
  }
};

const signupUser = async (req, res) => {
  const db = req.app.get("db");
  const { firstName, lastName, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    const user = await db.auth.signup(uuid(), firstName, lastName, email, hash);

    delete user.password;

    const token = jwtSignUser(user[0]);

    res.cookie("user", {
      token,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });

    res.status(201).json({ user: user[0], token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { signinUser, signupUser };
