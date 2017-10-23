import './user.styl';

import userRun from './user.run';
import userConfig from './user.config';

import $user from './services/user.provider';

import UserSignInComponent from './sign-in';
import UserRecoverComponent from './recover';
import UserResetPasswordComponent from './reset-password';

const requires = ['ui.router'];

const CommonUserComponentModule = angular.module('component.user', requires)
  .provider('$user', $user)
  .component('userSignIn', UserSignInComponent)
  .component('userRecover', UserRecoverComponent)
  .component('userResetPassword', UserResetPasswordComponent)
  .config(userConfig)
  .run(userRun)
  .name;

export default CommonUserComponentModule;
