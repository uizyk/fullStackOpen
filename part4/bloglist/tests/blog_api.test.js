const mongoose = require ('mongoose');
const supertest = require ('supertest');
const app = require ('../app');

mongoose.set("bufferTimeoutMS", 1000000)

const api = supertest (app);

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}, 100000);

afterAll(async () => {
    await mongoose.connection.close();
})