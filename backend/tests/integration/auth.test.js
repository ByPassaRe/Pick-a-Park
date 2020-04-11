const supertest = require('supertest');

const app = require('../../src/app');
const dbHandler = require('./../utils/testDbHandler');
const userModel = require('./../../src/models/user');

const request = supertest(app);
const validUserJSON = {
    username: "aldo",
    password: "aldoaldo",
    email: "giulio@lauri.it",
    role: "DRIVER",
};


beforeAll(async () =>{
    await dbHandler.connect();
    //User test
    await userModel.create(validUserJSON);
});

afterAll(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
});

describe('User - Login', () => {
    it('succeeds with correct credentials', async () => {
        const response = await request
            .post('/auth')
            .send(validUserJSON)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        
        expect(response.status).toBe(200);

});

    it('fails with invalid credentials', async () => {
        const response = await request
            .post('/auth')
            .send({ username: "n00000b", password: "enricopoesse" })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        
        expect(response.status).toBe(400);
    });

    it('fails with missing credentials', async () => {
        const response = await request
            .post('/auth')
            .send({})
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');
        
        expect(response.status).toBe(400);
    });
});