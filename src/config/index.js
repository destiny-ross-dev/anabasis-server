require("dotenv").config();

const env = process.env.NODE_ENV || "development";

const config = {
  env,
  port: process.env.PORT || 4400,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: "100d",
    session: process.env.SESSION_SECRET,
  },
  db: process.env.CONNECTION_STRING,
};

module.exports = config;
