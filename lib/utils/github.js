const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ client_id, client_secret, code }),
  })
    .then((resp) => resp.json)
    .then(({ access_token }) => {
      return access_token;
    });
};

const getProfile = (token) => {
  return fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  }).then((resp) => resp.json());
};

module.exports = { exchangeCodeForToken, getProfile };
