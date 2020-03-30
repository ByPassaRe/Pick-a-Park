const mongoose = require('mongoose');

const dbHandler = require('./utils/dbHandler');
const parkingSpotModel = require('./../../models/parkingSpot');

beforeAll(async () => await dbHandler.connect());
afterAll(async () => await dbHandler.closeDatabase());

afterEach(async () => await dbHandler.clearDatabase());

const exampleValidParkingSpot = {
    latitude: 45.464203,
    longitude: 9.189982,
    available: false
};

const exampleBadCoordinatesParkingSpot = {
    latitude: 210.5,
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

    it('rejects on Invalid Coordinates', async () => {
        await expect(parkingSpotModel.create(exampleBadCoordinatesParkingSpot))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

});