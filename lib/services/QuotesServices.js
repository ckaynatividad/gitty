const fetch = require('cross-fetch');

module.exports = class QuotesServices {
  static fetchQuotes() {
    const apis = [
      'https://programming-quotes-api.herokuapp.com/quotes/random',
      'https://futuramaapi.herokuapp.com/api/quotes/1',
      'https://api.quotable.io/random',
    ];
    const promises = apis.map((api) => fetch(api));
    return Promise.all(promises).then((resp) => {
      return Promise.all(resp.map((item) => item.json())).then((array) =>
        array.map((item) => {
          return {
            author: item.author || item[0].character,
            content: item.en || item.content || item[0].quote,
          };
        })
      );
    });
  }
};
