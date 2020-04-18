const parkingSpots = require("../controllers/parkingSpot.js");
const router = require("express").Router();

router.post("/", parkingSpots.create);
router.get("/", parkingSpots.read);
router.patch("/:id", parkingSpots.patch);
router.get("/nearest", parkingSpots.getNearest);
router.get("/:id", parkingSpots.read);
router.patch('/:id/available', parkingSpots.activate);

module.exports = router;