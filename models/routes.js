const bearer = require ('../middlewares/bearer.middleware');
const acl = require ('../middlewares/acl.middleware');
const express = require ('express');
const router = express.Router();

router.get("/user" ,bearer, acl('delete'), (req, res) => { // only for admins
    res.json({
      message: "Correct Login",
      user: req.user,
    });
  });

  router.get("/blog-post", bearer, acl("read"), (req, res) => {
    res.send("reading the blog post");
  });
  
  router.post("/blog-post", bearer, acl("create"), (req, res) => {
    res.send("creating the blog post");
  });
  
  router.put("/blog-post", bearer, acl("update"), (req, res) => {
    res.send("updating the blog post");
  });
  
  router.patch("/blog-post", bearer, acl("update"), (req, res) => {
    res.send("updating the blog post");
  });
  
  router.delete("/blog-post", bearer, acl("delete"), (req, res) => {
    res.send("deleting the blog post");
  });

  module.exports = router;