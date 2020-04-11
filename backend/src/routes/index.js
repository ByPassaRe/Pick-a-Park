const parkingSpotsRoute = require('./parkingSpot');
const usersRoute = require('./user');
const authRoute = require('./auth');

module.exports.attachToApp = (app) => {
    app.use('/users', usersRoute);
    app.use('/parkingSpots', parkingSpotsRoute);
    app.use('/auth', authRoute);
}