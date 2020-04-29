const BugReport = require('./../models/bugReport');

exports.create = async (req, res) => {
    if(!req.body.text) {
        return res.sendStatus(400);
    }

    try {
        const newBugReport = await BugReport.create({text: req.body.text});
        return res.sendStatus(200);
    } catch (err) {
        return res.sendStatus(500);
    }
}

exports.get = async (req, res) => {
    const bugReports = await BugReport.find({});
    return res.send(bugReports);
};