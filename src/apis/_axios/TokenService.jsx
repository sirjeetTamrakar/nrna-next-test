const getLocalRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
};

const getLocalAccessToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

const updateLocalAccessToken = (Token) => {
  localStorage.setItem('token', Token);
};
const updateLocalRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalAccessToken,
  updateLocalRefreshToken
};

export default TokenService;
