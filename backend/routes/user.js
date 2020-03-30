module.exports = app => {
      
    const users = require("../controllers/user.js");
    var router = require("express").Router();
    router.post("/signup", users.create);

  
    app.use("/", router);
};