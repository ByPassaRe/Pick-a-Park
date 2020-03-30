const mongoose = require('mongoose');

const dbHandler = require('./utils/dbHandler');
let parkingSpot;
let db;

beforeAll(async () => {
    db = await dbHandler.connect();
    parkingSpot = require('./../../models/parkingSpot')(db);
});

afterAll(async () => await dbHandler.closeDatabase(db));

afterEach(async () => await dbHandler.clearDatabase(db));

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
        expect(async () => await parkingSpot.create(exampleValidParkingSpot))
            .not
            .toThrow();
    });

    it('rejects on Invalid model', async () => {
        await expect(parkingSpot.create(exampleInvalidParkingSpot))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

    it('rejects when there are no coordinates', async () => {
        const parkingWithoutLocation = {};
        await expect(parkingSpot.create(parkingWithoutLocation))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

    it('rejects on Invalid Coordinates', async () => {
        await expect(parkingSpot.create(exampleBadCoordinatesParkingSpot))
            .rejects
            .toThrow(mongoose.Error.ValidationError);
    });

    it('should set available to false on creation', async () => {
        const availableTrueParkingSpot = {...exampleValidParkingSpot, available: true};
        
        const createdParkingSpot = await parkingSpot.create(availableTrueParkingSpot);
        expect(createdParkingSpot.available).toBe(false);
    });

});