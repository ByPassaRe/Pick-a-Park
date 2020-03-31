const mongoose = require('mongoose');

const dbHandler = require('../../utils/testDbHandler');
const userModel = require('../../../models/user');

beforeAll(async () => await dbHandler.connect());
afterAll(async () => await dbHandler.closeDatabase());
afterEach(async () => await dbHandler.clearDatabase());

describe('User - presence of required fields', () => {

    it('is created when valid', async () => {
        expect(async () => await userModel.create({
            username: "aldomontecchiari",
            password: "pippoplutopaperino",
            email: "giulio@lauri.it",
            role: "DRIVER",
        }))
        .not
        .toThrow();
    });

    it('rejects if username is not present', async () => {
        await expect(userModel.create({
            password: "pippoplutopaperino",
            email: "giulio@lauri.it",
            role: "DRIVER",
        }))
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    });

    it('rejects if password is not present', async () => {
        await expect(userModel.create({
            username: "aldomontecchiari",
            email: "giulio@lauri.it",
            role: "DRIVER",
        }))
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    });
    
    it('rejects if email is not present', async () => {
        await expect(userModel.create({
            username: "aldomontecchiari",
            password: "pippoplutopaperino",
            role: "DRIVER",
        }))
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    });
});

describe('User - Check Username', () => {
    
    it('rejects if username length < 3', async () => {
        await expect(userModel.create({
            username: "a",
            password: "pippoplutopaperino",
            email: "giulio@lauri.it",
            role: "DRIVER",
        }))
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    });

    it('rejects if username length > 30', async () => {
        await expect(userModel.create({
            username: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaA",
            password: "pippoplutopaperino",
            email: "giulio@lauri.it",
            role: "DRIVER",
        }))
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    });

    it('rejects if username contains invalid char', async () => {
        await expect(userModel.create({
            username: "ciao°°°e",
            password: "pippoplutopaperino",
            email: "giulio@lauri.it",
            role: "DRIVER",
        }))
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    });

});


describe('User - Check Password', () => {
    
    it('rejects if passsword length < 8', async () => {
        await expect(userModel.create({
            username: "aldomontecchiari",
            password: "o",
            email: "giulio@lauri.it",
            role: "DRIVER",
        }))
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    });
});
