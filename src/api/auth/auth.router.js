const express = require("express");
const { signinUser, signupUser } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/signin", signinUser);
authRouter.post("/signup", signupUser);

module.exports = authRouter;
