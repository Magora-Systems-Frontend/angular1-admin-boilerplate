import template from './reset-password.pug';

function ResetPasswordConfig($stateProvider){
	'ngInject';

	$stateProvider
		.state('app.reset-password', {
			template,
			url: '/reset-password',
			data: {
				title: 'Reset password'
			}
		});
}

export default ResetPasswordConfig;