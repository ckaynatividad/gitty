const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
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
  })
  .post('/', authenticate, (req, res, next) => {
    Post.insert(req.body)
      .then((post) => res.send(post))
      .catch((error) => next(error));
  });
