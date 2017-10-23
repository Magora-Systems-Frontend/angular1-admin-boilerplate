import './category.styl'

import CategoryConfig from './category.config';
import CtrlCategory from './category.controller';

const requires = [

];

const CategoryModule = angular
  .module('app.main.category', requires)
  .controller('CategoryCtrl', CtrlCategory)
  .config(CategoryConfig)
  .name;

export default CategoryModule;