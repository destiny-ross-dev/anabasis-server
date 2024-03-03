const express = require("express");
const globalMiddleware = require("./middleware/global.js");
const connect = require("./middleware/db.js");
const config = require("./config/index.js");
const authRouter = require("./api/auth/auth.router.js");

const app = express();

globalMiddleware(app);

// app.use("*", (req, res) => {
//   res.status(200).json({
//     firstName: "Destiny",
//     lastName: "Ross",
//     email: "destiny@gmail.com",
//   });
// });

app.use("/api/auth", authRouter);

const start = async () => {
  // console.log()
  try {
    await connect(app);
    app.listen(config.port, () => {
      console.log(`Rest api on http://localhost:${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
