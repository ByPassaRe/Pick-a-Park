const supertest = require('supertest');

const app = require('./../../app');
const dbHandler = require('./../utils/testDbHandler');

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());

afterAll(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
});

describe('Parking Spot Route', () => {
    it('should return 500 on empty parkingSpot', async () => {
        const response = await request.post('/parkingSpots');

        expect(response.status).toBe(500);
    });
    
});