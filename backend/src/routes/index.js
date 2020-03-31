const parkingSpotsRoute = require('./parkingSpot');
const usersRoute = require('./user');

module.exports.attachToApp = (app) => {
    app.use('/users', usersRoute);
    app.use('/parkingSpots', parkingSpotsRoute);
}