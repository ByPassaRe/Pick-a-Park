const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
    text : {type: String,required: true }
    
});

IssueSchema.pre('save', async function() {
});

const Issue = mongoose.model('Issue', IssueSchema);

module.exports = Issue;