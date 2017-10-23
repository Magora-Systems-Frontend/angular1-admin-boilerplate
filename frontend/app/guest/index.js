import './guest.styl'

import './sign-in'
import './reset-password'

import GuestConfig from './guest.config';
import GuestCtrl from './guest.controller';

const requires = [
  'app.guest.sign-in',
  'app.guest.reset-password'
];

const GuestModule = angular
  .module('app.guest', requires)
  .config(GuestConfig)
  .controller('GuestConfig', GuestCtrl)
  .name;

export default GuestModule;