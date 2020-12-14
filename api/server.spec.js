const request = require('supertest');
const server = require('./server');
const testUser = {username: 'testing', password: 'testing'}
const db = require('./data/dbConfig');


describe('server.js', () => {                       // I used the .spec file because it's what I got used to with Kirkby
    describe('Get request for jokes', () => {
        it('400 status when not logged in', async () => {
            const res = await request(server).get('/api/jokes')
        expect(res.status).toBe(400);
        })

        it('should return json', async() => {
            const res = await request(server).get('/api/jokes');
            expect(res.type).toBe('application/json')
        });
    });

describe('Registration', () => {
        it('201 status when adding a new user', async () => {
        await db('users').truncate()
        const res = await request(server)
        .post('/api/auth/register')
        .send(testUser);
        expect(res.status).toBe(201)
        });

        it('500 status with an invalid user', async () => {
        const res = await request(server)
        .post('/api/auth/register')
        .send({user: "test", pass: "jabroni" });
        expect(res.status).toBe(500);
    })
});

describe('Login', () => {
        it('200 status with test user', async () => {
        const res = await request(server)
        .post('/api/auth/login')
        .send(testUser);
        expect(res.status).toBe(200)
        })

        it('401 status with invalid user', async () => {
        const res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'We cant find this user', password: 'Please Enter A Password' })
        expect(res.status).toBe(401)
    })
})
});