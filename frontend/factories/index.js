import Validators from './validators'
import GmPlace from './gmPlace';

const requires = [];

const factoriesModule = angular
  .module('app.factories', [])
  .factory('Validators', Validators)
	.factory('GmPlace', ($q, uiGmapIsReady) => {
		'ngInject';
		return new GmPlace($q, uiGmapIsReady)
	})
  .name;

export default factoriesModule;
