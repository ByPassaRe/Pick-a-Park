const parkingSpots = require("../controllers/parkingSpot.js");
const router = require("express").Router();

router.post("/", parkingSpots.create);
router.get("/", (req,res) => res.sendStatus(200));

module.exports = router;