const supertest = require('supertest');

const app = require('../../src/app');
const dbHandler = require('./../utils/testDbHandler');
const role = require("../../src/util/role");
const request = supertest(app);
var token = {};


const createDummyUser = async (username, password, email, role) => {
   const dummyUser =  {"username": username,"password": password, "email": email, "role": role};
    //Create user
    await request
        .post('/users/')
        .send(dummyUser);
     //Login user
    const response = await request
        .post('/auth/')
        .send({"username": username,"password": password});
    
    return response.body.token;
}


beforeAll(async () => {
    await dbHandler.connect();
    token.driver = await createDummyUser("aldo","aldoaldo","aldo@aldo.it",role.DRIVER);
    token.parkingcompany = await createDummyUser("bort","bortbort","bort@bort.it",role.PARKING_COMPANY);
    token.municipalityemployee = await createDummyUser("safi","safisafi","safi@safi.it",role.MUNICIPALITY_EMPLOYEE);
    token.municipalitypolice = await createDummyUser("enrico","enricopoesse","enrico@poesse.it",role.MUNICIPALITY_POLICE);
});


afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => {
    await dbHandler.closeDatabase();
});

const exampleValidParkingSpot = {
    location: {
        latitude: 45.464203,
        longitude: 9.189982,
    },
    available: false
};

const validParkingSpotJson = JSON.stringify(exampleValidParkingSpot);

describe('Parking Spot Route', () => {
    describe('POST /parkingSpots', () => {
        it('should return 400 on empty parkingSpot', async () => {
            const response = await request
            .post('/parkingSpots')
            .set('Authorization', token.municipalityemployee);
    
            expect(response.status).toBe(400);
        });
    
        it('should return 400 on an invalid parkingSpot', async () => {
            const invalidJson = JSON.stringify({...exampleValidParkingSpot, location:"Ibiza"});
            
            const response = await request
                .post('/parkingSpots')
                .send(invalidJson)
                .set('Authorization', token.municipalityemployee)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
    
            
            expect(response.status).toBe(400);
        });
    
        it('should return 200 on valid parkingSpot creation', async () => {
    
            const response = await request
                .post('/parkingSpots')
                .send(validParkingSpotJson)
                .set('Authorization', token.municipalityemployee)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
    
            expect(response.status).toBe(200);
        });
    });
    
    describe('GET /parkingSpots', () => {
        it('Should return 200 on get parkingSpots', async () => {
            const res = await request
            .get('/parkingSpots').set('Authorization', token.driver);
            expect(res.status).toBe(200);
        });
        
        it('Should respond with a parkingSpots field at /', async () => {
            const res = await request.get('/parkingSpots').set('Authorization', token.driver);
            expect(res.body.parkingSpots).toBeDefined();
        });

        it('Should respond with all the parkingSpots in the db at /', async () => {
            const totalParkingSpots = 3;
            for(let i = 0; i < totalParkingSpots; i++) {
                await request
                    .post('/parkingSpots')
                    .send(validParkingSpotJson)
                    .set('Authorization', token.municipalityemployee)
                    .set('Content-Type', 'application/json')
                    .set('Accept', 'application/json');
            };

            const res = await request.get('/parkingSpots').set('Authorization', token.municipalityemployee);
            expect(res.body.parkingSpots).toHaveLength(totalParkingSpots);
        });

        it('Should return the specific parkingspot using the id at /:id', async () => {
            const preRes = await request
                .post('/parkingSpots')
                .send(validParkingSpotJson)
                .set('Authorization', token.municipalityemployee)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json');
            const parkingSpotId = preRes.body._id;

            const res = await request.get(`/parkingSpots/${parkingSpotId}`).set('Authorization', token.parkingcompany);
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject(exampleValidParkingSpot);
        });

        it('should return 404 if no parkingSpot has target id at /:id', async () => {
            const res = await request
            .get(`/parkingSpots/507f1f77bcf86cd799439011`)
            .set('Authorization', token.parkingcompany);
            expect(res.status).toBe(404);
        });

        it('should return 400 if the target id at /:id is an invalid id', async () => {
            const res = await request.get(`/parkingSpots/INVALID`).set('Authorization', token.parkingcompany);
            expect(res.status).toBe(400);
        });
    });
});