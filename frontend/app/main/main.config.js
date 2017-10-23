import template from './main.pug';

function MainConfig($stateProvider) {

  'ngInject';

  $stateProvider
    .state('app.main', {
      url: '/',
      template,
      controller: 'MainCtrl',
      controllerAs: '$ctrl',
      redirectTo: 'app.main.category',
      data: {
        title: 'Main',
        access: ['MANAGER']
      }
    });
}

export default MainConfig;
