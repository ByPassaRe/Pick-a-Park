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
        startTime: {
            type: Date,
            default: Date.now
        },
        endTime: {
            type: Date
        }
    },
    { timestamps: true }
);

const Prenotation = mongoose.model('Prenotation', PrenotationSchema);

module.exports = Prenotation;