const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const GithubUser = require('../lib/models/GithubUser');

jest.mock('../lib/utils/github');

describe('posts routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should login and redirect users to all posts', async () => {
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

  it('allows user to create post', async () => {
    const agent = request.agent(app);
    const expected = {
      content: 'test test test',
    };

    let res = await agent.post('/api/v1/posts').send(expected);
    expect(res.status).toEqual(401);

    await agent.get('/api/v1/github/login/callback?code=42').redirects(1);

    res = await agent.post('/api/v1/posts').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
