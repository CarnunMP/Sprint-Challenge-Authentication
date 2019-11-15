const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeAll(async () => {
  await db('users').truncate();
})

describe('authRouter /api/auth', () => {
  describe('[POST] /register', () => {
    test('should return an OK (201) status code', async () => {
      const testUser = { username: "test", password: "1234" };
      const response = await request(server).post('/api/auth/register').send(testUser);
      expect(response.status).toEqual(201);
    });

    test('should return a JSON object with the given username', async () => {
      const testUser = { username: "test1", password: "1234" };
      const response = await request(server).post('/api/auth/register').send(testUser);
      console.log(response.body);
      expect(typeof response.body).toBe('object');
      expect(response.body.username).toEqual(testUser.username);
    });
  });
});