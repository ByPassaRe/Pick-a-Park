const parkingSpots = require("../controllers/parkingSpot.js");
const router = require("express").Router();
const authorize = require("../util/authorize");
const role = require("../util/role");


router.post("/",
    authorize([role.MUNICIPALITY_EMPLOYEE]),
    parkingSpots.create);

router.get("/",
    authorize([]), 
    parkingSpots.read);

router.patch("/:id",
    authorize([role.MUNICIPALITY_EMPLOYEE,role.PARKING_COMPANY]),
    parkingSpots.patch);

router.get("/nearest",
    authorize([role.DRIVER]),
    parkingSpots.getNearest);

router.get("/:id",
    authorize([]), 
    parkingSpots.read);

router.patch('/:id/activate', 
    authorize([role.MUNICIPALITY_EMPLOYEE]),
    parkingSpots.activate);

router.patch('/:id/disable', 
    authorize([role.MUNICIPALITY_EMPLOYEE]),
    parkingSpots.deactivate);
    
    
module.exports = router;

  