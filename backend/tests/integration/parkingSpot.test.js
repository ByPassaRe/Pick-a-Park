const mongoose = require('mongoose');

const dbHandler = require('./utils/dbHandler');
const parkingSpotModel = require('./../../models/parkingSpot');

beforeAll(async () => await dbHandler.connect());
afterAll(async () => await dbHandler.closeDatabase());

afterEach(async () => await dbHandler.clearDatabase());

const exampleValidParkingSpot = {
    location: {
        latitude: 45.464203,
        longitude: 9.189982,
    },
    available: false
};

const exampleBadCoordinatesParkingSpot = {
    location: {
        latitude: 210.5,
        longitude: 9.189982,
    },
    available: false
};

const exampleInvalidParkingSpot = {
    location: {
        latitude: "Invalid",
        longitude: 9.189982,
    },
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

    it('rejects when there are no coordinates', async () => {
        const parking = {};
        await expect(parkingSpotModel.create(parking))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

    it('rejects on Invalid Coordinates', async () => {
        await expect(parkingSpotModel.create(exampleBadCoordinatesParkingSpot))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

    it('should set available to false on creation', async () => {
        const availableTrueParkingSpot = {...exampleValidParkingSpot, available: true};
        
        const createdParkingSpot = await parkingSpotModel.create(availableTrueParkingSpot);
        expect(createdParkingSpot.available).toBe(false);
    });

});