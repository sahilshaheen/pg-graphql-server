import 'dotenv/config'
import supertest from 'supertest';
import { expect } from 'chai';

const request = supertest(`http://localhost:${process.env.PORT}`)

describe('User tests', () => {
    it('should retrieve users', async () => {
        const res = await request.post('/').send({
            query: `{
                users {
                    id
                }
            }`
        }).expect(200);
        expect(res.body.data.users).to.be.an('array');
    })
    it('should retrieve user by id', async () => {
        const res = await request.post('/').send({
            query: `{
                user(userId: 2) {
                    id
                }
            }`
        }).expect(200);
        const user = res.body.data.user
        expect(user).to.be.an('object');
    })
})