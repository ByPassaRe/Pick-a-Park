const mongoose = require('mongoose');

const dbHandler = require('./utils/dbHandler');
const parkingSpotModel = require('./../../models/parkingSpot');

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

const exampleValidParkingSpot = {
    latitude: 45.464203,
    longitude: 9.189982,
    available: false
};

const exampleInvalidParkingSpot = {
    latitude: "Invalid",
    longitude: 9.189982,
    available: false
};

describe('Parking Spot ', () => {

    it('is created when valid', async () => {
        expect(async () => await parkingSpotModel.create(exampleValidParkingSpot))
            .not
            .toThrow();
    });

    it('rejects on Invalid model', async () => {
        await expect(parkingSpotModel.create(exampleInvalidParkingSpot))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

});