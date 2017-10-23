export default function config($stateProvider,
                               $urlRouterProvider,
                               $locationProvider,
                               $httpProvider,
															 cfpLoadingBarProvider,
															 uiGmapGoogleMapApiProvider
) {
  'ngInject';

	cfpLoadingBarProvider.includeSpinner = false;

  $stateProvider
    .state('app', {
      abstract: true,
      template: '<ui-view/>',
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false,
  });

	uiGmapGoogleMapApiProvider.configure({
		key: process.env.GOOGLE_API_KEY,
		v: '3.20',
		libraries: 'places,geometry,visualization'
	});

  $httpProvider.interceptors.push(($q, $location, $injector) => {
    return {
      responseError(rejection) {
        const ngToast = $injector.get('ngToast');
        rejection.data.errors.forEach(({code, field, message}) => {
          ngToast.create({
            content: `<div><p>${message}</p></div>`,
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
            timeout: 10000,
            className: 'danger'
          });
        });

        return $q.reject(rejection);
      }
    };
  });

  $urlRouterProvider.otherwise('/');
}
