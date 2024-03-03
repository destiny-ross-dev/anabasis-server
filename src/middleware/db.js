const massive = require("massive");
const config = require("../config/index.js");

const connect = (app) => {
  console.log(`Connected to postgres database`);
  massive(config.db)
    .then((db) => app.set("db", db))
    .catch((err) => console.log(err));
};

module.exports = connect;
