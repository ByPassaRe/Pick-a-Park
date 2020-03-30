const mongoose = require('mongoose');


const ParkingSpotSchema = new mongoose.Schema({
    latitude: {type:Number, min: -90, max: 90},
    longitude: {type:Number, min: -180, max: 180},
    available: Boolean
});

const ParkingSpot = mongoose.model('ParkingSpot', ParkingSpotSchema);

module.exports = ParkingSpot;