const ParkingSpot = require("../models/parkingSpot");

exports.create = (req, res) => {
  
  const parkingSpot = new ParkingSpot({
    location: req.body.location
  });

  parkingSpot
    .save(parkingSpot)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      if(err.message) {
        res.status(400).send({message: err.message});
      } else {
        res.status(500).send({message: "Some error occurred while creating the Parking Spot."});
      }
    });
};

exports.read = async (req, res) => {
  if(req.params.id) {
    let target;

    try {
      target = await ParkingSpot.findById(req.params.id);
    } catch (err) {
      return res.sendStatus(400);
    } 
    if(!target) {
      return res.sendStatus(404);
    }
    res.send(target);
  } else {
    const parkingSpots = await ParkingSpot.find({});
    res.send({parkingSpots});
  }
};
