const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/github');

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should login and redirect users to all posts', async () => {
    const expected = [
      {
        id: '1',
        content: 'Hello there',
      },
    ];
    await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(expected);
      });
  });

  it('allows user to create post', async () => {
    const agent = request.agent(app);
    const expected = {
      content: 'test test test',
    };

    await agent
      .post('/api/v1/posts')
      .send(expected)
      .then((res) => {
        expect(res.status).toEqual(401);
      });

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    return agent
      .post('/api/v1/posts')
      .send(expected)
      .then((res) => {
        expect(res.body).toEqual({ id: expect.any(String), ...expected });
      });
  });
});
