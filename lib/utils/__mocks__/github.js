/* eslint-disable no-console */
const exchangeCodeForToken = async (code) => {
  console.log(`MOCK INVOKED: exchangeCodeForToken(${code})`);
  return `MOCK_TOKEN_FOR_CODE_${code}`;
};

const getProfile = async (token) => {
  console.log(`MOCK INVOKED: getProfile(${token})`);
  return {
    login: 'omelette',
    avatar_url: 'https://www.placecage.com/gif/300/300',
    email: 'omelette@example.com',
  };
};

module.exports = { exchangeCodeForToken, getProfile };
