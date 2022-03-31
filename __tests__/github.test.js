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

  it('should redirect', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);
    const expected = expect.stringMatching('/api/v1/posts');
    expect(res.redirects).toContainEqual(expected);
  });

  it('should login and redirect users to posts', async () => {
    const res = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual([
      {
        id: '1',
        content: 'Hello there',
      },
    ]);
  });

  it('logsout user via delete', async () => {
    const res = await request.agent(app).delete('/api/v1/github');
    expect(res.body).toEqual({
      message: 'signed out',
      success: true,
    });
  });
});
