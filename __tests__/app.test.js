const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect to oauth on login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('should login and redirect users to github dashboard', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
    expect(req.body).toEqual({
      id: expect.any(String),
      username: 'omelette',
      email: 'omelette@example.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });
});
