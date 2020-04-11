const supertest = require('supertest');

const app = require('../../src/app');
const dbHandler = require('./../utils/testDbHandler');

const request = supertest(app);

beforeAll(async () => await dbHandler.connect());

afterAll(async () => {
    await dbHandler.clearDatabase();
    await dbHandler.closeDatabase();
});

const validJson = {
    username: "aldomontecchiari",
    password: "pippoplutopaperino",
    email: "giulio@lauri.it",
    role: "DRIVER",
};

describe('Users Route', () => {
    it('should return 400 on empty user', async () => {
        const response = await request.post('/users').send(JSON.stringify({}));
        expect(response.status).toBe(400);
    });

    it('should return 400 on an invalid Username', async () => {
        const invalidJson = JSON.stringify({...validJson, username: "a"});

        const response = await request
            .post('/users')
            .send(invalidJson)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(response.status).toBe(400);
    });

    it('should return 400 on an invalid Password', async () => {
        const invalidJson = JSON.stringify({...validJson, password: ":("});

        const response = await request
            .post('/users')
            .send(invalidJson)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(response.status).toBe(400);
    });

    it('should return 400 on an invalid email', async () => {
        const invalidJson = JSON.stringify({...validJson, email: "fakemail"});

        const response = await request
            .post('/users')
            .send(invalidJson)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(response.status).toBe(400);
    });

    it('should return 400 on an invalid role', async () => {
        const invalidJson = JSON.stringify({...validJson, role: "NOT_EXISTS"});

        const response = await request
            .post('/users')
            .send(invalidJson)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(response.status).toBe(400);
    });


    it('should return 200 on valid user creation', async () => {

        const response = await request
            .post('/users')
            .send(JSON.stringify(validJson))
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
    });
});