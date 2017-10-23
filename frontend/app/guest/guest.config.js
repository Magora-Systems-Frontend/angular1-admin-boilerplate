import template from './guest.pug';

function GuestConfig($stateProvider) {
  
  'ngInject';
  
  $stateProvider
    .state('app.guest', {
      template,
      redirectTo: '/guest/sign-in',
      url: '/guest',
      data: {
        title: 'Sign In'
      }
    });
}

export default GuestConfig;
