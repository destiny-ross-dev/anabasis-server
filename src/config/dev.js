module.exports = config = {
  secrets: {
    jwt: process.env.DEV_JWT_SECRET,
  },
  db: process.env.DEV_CONNECTION_STRING,
};
