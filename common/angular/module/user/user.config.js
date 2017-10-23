function UserConfig($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push(($q, $location, $injector) => {
    return {
      responseError(rejection) {
        const $user = $injector.get('$user');

        switch (rejection.status) {
          case 401: {
            $user.logout();
            break;
          }
          case 403: {
            $user.userClear();
          }
        }

        return $q.reject(rejection);
      }
    };
  });

  $httpProvider.interceptors.push(['$q', '$injector', ($q, $injector) => {
    return {
      request(config) {

        if (config.url.match(/auth\/token/) || config.url.match(/\/registration\/users\/password/)) {
          return config;
        }

        if (config.url.match(/amazonaws.com/)) {
          delete config.headers["Content-Type"];
          return config;
        }

        if (config.url.split('//').length > 1) {
          const $user = $injector.get('$user');

          return (function (config) {
            const defferedConfig = $q.defer();

            if($user.isExpire()) {
              $user.generateRequestForRefreshToken(config);

              $user.refresh.awaitQueue.push(function(){
                config.headers['Authorization'] = `Bearer ${$user.getUserToken()}`;
                defferedConfig.resolve(config);
              });

            } else {
              config.headers['Authorization'] = `Bearer ${$user.getUserToken()}`;
              defferedConfig.resolve(config);
            }

            return defferedConfig.promise;
          })(config);
        }

        return config;
      }
    };
  }]);
}

export default UserConfig;
