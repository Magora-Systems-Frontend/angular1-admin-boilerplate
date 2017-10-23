import RowEditHelper from './row-edit-helper/row-edit-helper';
import FormValidator from './form-validator/form-validator';
import Filepicker from './filepicker/filepicker';

const directivesModule = angular
  .module('app.directives', [])
  .directive('rowEditHelper', RowEditHelper)
  .directive('formValidator', FormValidator)
	.directive('filepicker', Filepicker)
  .name;

export default directivesModule;