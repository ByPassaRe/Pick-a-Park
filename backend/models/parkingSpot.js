const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    available: Boolean
});

const ParkingSpot = mongoose.model('ParkingSpot', ParkingSpotSchema);

module.exports = ParkingSpot;