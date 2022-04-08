const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('quotes routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('gets quotes', () => {
    const agent = request.agent(app);
    const expected = [
      { author: expect.any(String), content: expect.any(String) },
      { author: expect.any(String), content: expect.any(String) },
      { author: expect.any(String), content: expect.any(String) },
    ];
    agent.get('/api/v1/quotes').then((res) => {
      expect(res.body).toEqual(expected);
    });
  });
});
