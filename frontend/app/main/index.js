import './main.styl'

import MainConfig from './main.config';
import MainCtrl from './main.controller';
import MainRun from './main.run';

import Category from './category';

const requires = [
  Category
];

const MainModule = angular
  .module('app.main', requires)
  .controller('MainCtrl', MainCtrl)
  .config(MainConfig)
  .run(MainRun)
  .name;

export default MainModule;
