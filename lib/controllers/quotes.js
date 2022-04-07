const { Router } = require('express');
const QuotesServices = require('../services/QuotesServices');

module.exports = Router().get('/', (req, res, next) => {
  QuotesServices.fetchQuotes()
    .then((quotes) => res.send(quotes))
    .catch((error) => next(error));
});
