const Prenotation = require("../models/prenotation");
const ParkingSpot = require("../models/parkingSpot");
const User = require("../models/user")

exports.create = async (req, res) => {
    if(!req.body.userId || !req.body.parkingSpotId)
        return res.status(400).send({message: "Parameters are not available"});
    
    let user, parkingSpot, prenotation;

    try { 
        user = await User.findById(req.body.userId).exec(); 
        parkingSpot = await ParkingSpot.findById(req.body.parkingSpotId).exec();
    } 
    catch (error) { return res.status(400).send({message: "Database error"}); }
    
    if(!user || !parkingSpot)
        return res.status(400).send({message: "User or Parking Spot not found"});

    if(!parkingSpot.available) 
        return res.status(400).send({message: "Parking spot selected is not available"});
    
    try {
        //Parking become unavailable
        await ParkingSpot.findByIdAndUpdate(req.body.parkingSpotId, {available: false}).exec();
        //Create prenotation
        prenotation = await Prenotation.create({
            userId: req.body.userId,
            parkingSpotId: req.body.parkingSpotId
        });
    } catch (error) {
        return res.status(400).send({message: err.message});
    }
    
    return res.status(200).send(prenotation);
}
