import userProviderSettings from './user.provider.settings';

function $user() {
  this.defaults = userProviderSettings;
  this.$get = UserFactory;
}

function UserFactory($parse, $state, $q, $window, $http) {
  'ngInject';

  const provider = this;
  const localStorage = $window.localStorage;

  provider.userLogo = {
    logoData: null
  };

  provider.isLoaded = true;

  provider.logoData = {};

  provider.userState = {};

  provider.patnerData = {};

  provider.refresh = {
    promise: null,
    awaitQueue: null
  };

  let user = { roles: [] };

  function get(key) {
    const getter = $parse(key);
    return getter(provider.defaults);
  }

  if (isAuthenticated()) {
    userExtend();
  } else {
    userClear();
  }

  function isAuthenticated () {
    const token = getUserToken();
    return (token && token.length > 10);
  }

  function userClear() {
    const dataPrefix = get('prefixes');
    const tokenKey = get('tokenKey');
    localStorage.removeItem(`${dataPrefix}.info`);
    localStorage.removeItem(`${dataPrefix}.hash`);
    localStorage.removeItem(tokenKey);
    user = { roles: [] };
  }

  function goToLogin() {
    $state.go(provider.defaults.login.state);
  }

  function getUserInfo() {
    const dataPrefix = get('prefixes');
    const string = localStorage.getItem(`${dataPrefix}.info`);
    const hash = +localStorage.getItem(`${dataPrefix}.hash`);

    if (string && string.getHash() !== hash) {
      userClear();
      goToLogin();

    } else {
      return angular.fromJson(string);
    }
  }

  function userExtend(data = {}) {
    angular.extend(user, getUserInfo(), data);
    const roles = user.authInfo.grants && user.authInfo.grants[0].roles ? user.authInfo.grants[0].roles : [];
    user.roles = roles;
    return user;
  }

  function isHaveRole(roles) {
    if (!angular.isArray(roles)) logout();
    let have = false;
    roles
      .forEach(role => {
        if (user.roles.indexOf(role) !== -1) {
          have = true;
        }
      });
    return have;
  }

  function setUserInfo(userInfo) {
    const _userInfo = userInfo.data;
    const dataPrefix = get('prefixes');

    const string = angular.toJson(_userInfo);

    localStorage.setItem(`${dataPrefix}.info`, string);
    localStorage.setItem(`${dataPrefix}.hash`, string.getHash());
    localStorage.setItem('', _userInfo.accessToken);
    if (_userInfo.accessToken) {
      localStorage.setItem(get('tokenKey'), _userInfo.accessToken);
    }
    
    if(_userInfo.authInfo && _userInfo.authInfo.grants && _userInfo.authInfo.grants.length) {
      localStorage.setItem('storeName', _userInfo.authInfo.grants[0].name);
      localStorage.setItem('storeId', _userInfo.authInfo.grants[0].storeId);
    }
  }

  function resetPassword(email) {
    return $http.put(`${process.env.API_PUBLIC_URL}/registration/users/password`, {email});
  }

  function restorePassword(email, cb, ecb) {

  }

  function logout() {
    userClear();
    goToLogin();
  }

  function signIn(credentials, rememberMe) {
    const deferred = $q.defer();
    const ctx = this;
    $http.post(`${process.env.API_ADMIN_URL}/auth/token`, credentials).then(
      (res) => {
        
        let resData = res.data;

        if (credentials.login) {
          resData.login = credentials.login;
        }
        ctx.setUserInfo(resData);
        userExtend();
        $state.go(provider.defaults.afterLogin.state);
        deferred.resolve(resData);
      },
      (res) => {
        deferred.reject(res.data || res);
      }
    );
    return deferred.promise;
  }

  function generateRequestForRefreshToken(config){
    if(!provider.refresh.promise){
      provider.refresh.promise = this.refreshToken();
      provider.refresh.awaitQueue = [];
      return provider.refresh.promise
        .then(function(userInfo){
          setUserInfo(userInfo);

          config.headers['Authorization'] = `Bearer ${userInfo.accessToken}`;

          const deferAll = provider.refresh.awaitQueue.map(function(defer){
            return defer();
          });

          resetRefreshObject();
/*
  todo: if error logout(); we not use angular promise with success error
* */
          return deferAll;
        })
    }
  }

  function resetRefreshObject(){
    provider.refresh.awaitQueue = null;
    provider.refresh.promise = null;
  }

  function refreshToken(){
    const deferred = $q.defer();
    const refreshToken = this.getUserInfo().refreshToken;
/*    Auth.refreshToken({refreshToken}, (response) => {
      let resData = response.data;
      deferred.resolve(resData);
    });*/

    return deferred.promise;
  }

  function isExpire(){
    let time = +new Date(this.getUserInfo().accessTokenExpire);

    return time / 1000 < Math.floor(((new Date()).getTime()) / 1000) + 110;
  }


  function getUserToken() {
    return localStorage.getItem(get('tokenKey')) || false;
  }

  function getLogo() {
    return provider.userLogo;
  }

  function getStatus() {
    return provider.isLoaded;
  }

  function setStatus(status) {
    provider.isLoaded = status;
  }

  return {
    get,
    getLogo,
    signIn,
    logout,
    goToLogin,
    userClear,
    getUserInfo,
    isAuthenticated,
    getUserToken,
    userExtend,
    isHaveRole,
    setUserInfo,
    resetPassword,
    restorePassword,
    getStatus,
    setStatus,
    refreshToken,
    isExpire,
    generateRequestForRefreshToken,
    userState: provider.userState,
    refresh: provider.refresh
  };
}

export default $user;
