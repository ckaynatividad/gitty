const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');

module.exports = Router()
  .get('/', authenticate, (req, res, next) => {
    Post.getPost(req.body)
      .then((posts) => res.send(posts))
      .catch((error) => next(error));
  })
  .post('/', authenticate, (req, res, next) => {
    Post.insert(req.body)
      .then((post) => res.send(post))
      .catch((error) => next(error));
  });
