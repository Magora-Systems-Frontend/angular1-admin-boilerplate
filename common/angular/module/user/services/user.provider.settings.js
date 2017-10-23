const userProviderSettings = {
  // user fields store to localStorage
  fields: ['displayName', 'userId', 'roles'],
  afterLogin: {
    state: 'app.main'
  },
  prefixes: '$user',
  tokenKey: 'token',
  refreshTokenKey: 'refreshToken',
  expireToken: "accessTokenExpire",
  login: {
    state: 'app.guest.sign-in'
  },
  logoURL: '/static/images/interprefy_logo.png'
};

export default userProviderSettings;
