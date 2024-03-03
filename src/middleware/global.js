const cors = require("cors");
const express = require("express");
const morganBody = require("morgan-body");

const globalMiddleware = (app) => {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
  app.use(express.json());
  morganBody(app);
};

module.exports = globalMiddleware;
