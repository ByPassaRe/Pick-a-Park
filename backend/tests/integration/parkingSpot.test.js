const supertest = require('supertest');

const app = require('../../src/app');
const dbHandler = require('./../utils/testDbHandler');

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());

afterAll(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
});

const exampleValidParkingSpot = {
    location: {
        latitude: 45.464203,
        longitude: 9.189982,
    },
    available: false
};

describe('Parking Spot Route', () => {
    describe('POST /parkingSpots', () => {
        it('should return 400 on empty parkingSpot', async () => {
            const response = await request.post('/parkingSpots');
    
            expect(response.status).toBe(400);
        });
    
        it('should return 400 on an invalid parkingSpot', async () => {
            const invalidJson = JSON.stringify({...exampleValidParkingSpot, location:"Ibiza"});
            
            const response = await request
                .post('/parkingSpots')
                .send(invalidJson)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
    
            
            expect(response.status).toBe(400);
        });
    
        it('should return 200 on valid parkingSpot creation', async () => {
    
            const validParkingSpotJson = JSON.stringify(exampleValidParkingSpot);
    
            const response = await request
                .post('/parkingSpots')
                .send(validParkingSpotJson)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
    
            expect(response.status).toBe(200);
        });
    });
    
    describe('GET /parkingSpots', () => {
        it('Should return 200 on get parkingSpots', async () => {
            const res = await request.get('/parkingSpots');
            expect(res.status).toBe(200);
        });
    });
});