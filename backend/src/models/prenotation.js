const mongoose = require('mongoose');

const PrenotationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parkingSpotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parking Spot',
        required: true
    },
    proximity: {
        type: Boolean,
        default: false,
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date
    }
},
    { timestamps: true }
);

const Prenotation = mongoose.model('Prenotation', PrenotationSchema);

module.exports = Prenotation;