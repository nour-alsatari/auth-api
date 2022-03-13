"use strict";
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const Users = require("./models/users.model");
const bearer = require("./middlewares/bearer.middleware");
const basic = require("./middlewares/basic.middleware");
const acl = require("./middlewares/acl.middleware");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("up and running");
});

app.post("/signup", async (req, res) => {
  try {
    let { password, username, role } = req.body;
    let hashed = await bcrypt.hash(password, 5);
    const record = await Users.create({
      username: username,
      password: hashed,
      role: role,
    });
    res.status(201).json(record);
  } catch (error) {
    res.status(403).send("Error occurred");
  }
});

app.get("/secret", bearer, async (req, res) => {
  res.status(200).json({ token: req.user.token });
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

app.get("/blog-post", bearer, acl("read"), (req, res) => {
  res.send("reading the blog post");
});

app.post("/blog-post", bearer, acl("create"), (req, res) => {
  res.send("creating the blog post");
});

app.put("/blog-post", bearer, acl("update"), (req, res) => {
  res.send("updating the blog post");
});

app.patch("/blog-post", bearer, acl("update"), (req, res) => {
  res.send("updating the blog post");
});

app.delete("/blog-post", bearer, acl("delete"), (req, res) => {
  res.send("deleting the blog post");
});

module.exports = app;
