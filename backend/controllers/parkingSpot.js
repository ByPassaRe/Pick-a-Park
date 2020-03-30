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
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Parking Spot."
      });
    });
};
