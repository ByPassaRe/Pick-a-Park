const mongoose = require('mongoose');

const ParkingSpotSchema = new mongoose.Schema({
    location: {
        latitude: {type:Number, min: -90, max: 90, required: true},
        longitude: {type:Number, min: -180, max: 180, required: true},
    },
    price: {type: Number, default: 0, min: 0},
    activated: {type: Boolean, default: false},
    available: {type: Boolean, default: false}
});

ParkingSpotSchema.pre('save', async function() {
    this.available = false;
});

const ParkingSpot = mongoose.model('ParkingSpot', ParkingSpotSchema);

module.exports = ParkingSpot;