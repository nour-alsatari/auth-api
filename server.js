"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("./models/users.model");
const bearer = require("./middlewares/bearer.middleware");
const basic = require("./middlewares/basic.middleware");
// const acl = require('./middlewares/acl.middleware');
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    let { password, username } = req.body;
    let hashed = await bcrypt.hash(password, 5);
    const record = await Users.create({
        'username': username,
        'password': hashed
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send("Error occurred");
  }
});

app.get("/user", bearer, (req, res) => {
  res.json({
    message: "Correct Login",
    user: req.user,
  });
});

app.post("/signin", basic, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = app;
