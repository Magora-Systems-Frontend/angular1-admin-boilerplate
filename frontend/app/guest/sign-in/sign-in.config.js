import template from './sign-in.pug';

function SignInConfig($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.guest.sign-in', {
      template,
      url: '/sign-in',
      data: {
        title: 'Sign In'
      }
    });
}

export default SignInConfig;
