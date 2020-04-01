const parkingSpots = require("../controllers/parkingSpot.js");
const router = require("express").Router();

router.post("/", parkingSpots.create);
router.get("/", parkingSpots.read);
router.get("/:id", parkingSpots.read);
module.exports = router;