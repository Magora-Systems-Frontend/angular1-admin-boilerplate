function AppRun(ngToast, AppConstants, $rootScope, $transitions, $http, $trace) {

  'ngInject';

  const $scope = $rootScope;

  $http.defaults.headers.common = { Accept: 'application/json', 'Content-Type': 'application/json' };

  $trace.enable('TRANSITION');

  $transitions.onStart({ }, function(trans) {
    let toState = trans.$to();

    const title = toState.data && toState.data.title;

    $rootScope.setPageTitle(title);
  });

  ngToast.settings = {
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  };

  $scope.setPageTitle = (title) => {
    $scope.pageTitle = '';
    $scope.pageTitle += AppConstants.appName;

    if (title) {
      $scope.pageTitle += ' - ';
      $scope.pageTitle += title;
    }
  };
}

export default AppRun;
