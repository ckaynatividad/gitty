const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const posts = [
      {
        id: '1',
        content: 'Hello there',
      },
    ];
    res.send(posts);
  } catch (error) {
    next(error);
  }
});
