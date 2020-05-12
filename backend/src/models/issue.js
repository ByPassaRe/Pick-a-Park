const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    text : {type: String, required: true },
    solved : {type:Boolean, default:false},
    parkingSpot : {type:String, required: false},
    { timestamps: true }
    
});




const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;