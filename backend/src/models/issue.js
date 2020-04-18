const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    text : {type: String,required: true }
    
});



const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;