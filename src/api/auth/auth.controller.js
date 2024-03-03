const bcrypt = require("bcrypt");
const config = require("../../config");

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, config.secrets.jwt, {
    expiresIn: ONE_WEEK,
  });
}

const signinUser = async (req, res) => {
  const db = req.app.get("db");
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await db.auth.signin(email)[0];
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    delete user.password;

    let token = jwtSignUser(user);

    res.cookie("user", {
      token,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
    });

    res.status(200).json({ user, token });
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

const signupUser = (req, res) => {
  console.log("sign up hit");
};

module.exports = { signinUser, signupUser };
