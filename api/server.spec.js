const request = require('supertest');
const server = require('./server');

describe('server', () => {
  describe('[GET] /', () => {
    test("The DB_ENV is 'testing'", () => {
      expect(process.env.DB_ENV).toBe('testing')
    });

    test('should return 200 OK', async () => {
      const response = await request(server).get('/')
      expect(response.status).toBe(200)
    });

    test('with supertest syntax', () => {
      return request(server).get('/')
        .expect(200)
        .expect({ api: 'up' })
        .expect('Content-Length', '12')
        .expect('Content-Type', /json/);
    });

    test('returns the right response body', async () => {
      const response = await request(server).get('/')
      expect(response.body).toEqual({ api: 'up' });
    });
  });
});