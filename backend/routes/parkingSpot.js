const parkingSpots = require("../controllers/parkingSpot.js");
const router = require("express").Router();

router.post("/", parkingSpots.create);

module.exports = app => {        
    app.use("/parkingSpots", router);
};