const mongoose = require('mongoose');

const BugReportSchema = new mongoose.Schema({
    text: {type: String, required: true},
    { timestamps: true }
});

const BugReport = mongoose.model('BugReport', BugReportSchema);

module.exports = BugReport;