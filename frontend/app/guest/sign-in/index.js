import './sign-in.styl';

import SignInConfig from './sign-in.config';

const requires = [];

const SignInModule = angular
  .module('app.guest.sign-in', requires)
  .config(SignInConfig);

export default SignInModule;