import './reset-password.styl'

import ResetPasswordConfig from './reset-password.config';

const requires = [];

const ResetPasswordModule = angular
	.module('app.guest.reset-password', requires)
	.config(ResetPasswordConfig);

export default ResetPasswordModule;