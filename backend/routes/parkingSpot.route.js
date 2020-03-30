module.exports = app => {
      
    const parkingSpots = require("../controllers/parkingSpot.controller.js");
    var router = require("express").Router();
    router.post("/", parkingSpots.create);

  
    app.use("/", router);
};