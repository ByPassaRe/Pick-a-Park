const mongoose = require('mongoose');
const ParkingSpot = require('./parkingSpot');

const IssueSchema = new mongoose.Schema({
    text : {type: String, required: true },
    solved : {type:Boolean, default:false},
    parkingSpot : [{type: mongoose.Schema.Types.ObjectId, ref: 'ParkingSpot'}]

    
});
IssueSchema.pre('save', async function() {
    this.solved = false;
});



const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;