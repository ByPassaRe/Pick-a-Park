const parkingSpotsRoute = require('./parkingSpot');
const usersRoute = require('./user');
const bugReportsRoute = require('./bugReport'); 
const authRoute = require('./auth');
const issueRoute = require('./issue');

module.exports.attachToApp = (app) => {
    app.use('/users', usersRoute);
    app.use('/parkingSpots', parkingSpotsRoute);
    app.use('/auth', authRoute);
    app.use('/issues', issueRoute);
    app.use('/bugReports', bugReportsRoute);
}