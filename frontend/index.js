import './styles/index.styl';
import * as helper from './helpers';

import constants from './config/app.constants';
import config from './config/app.config';
import appRun from './config/app.run';

import CommonUserComponent from '../common/angular/module/user';
import SidebarMenu from '../common/angular/module/sidebar-menu';
import Modal from '../common/angular/module/modal';

import './providers';
import './services';
import './factories';
import './components';
import './directives'

// Layouts
import './app/guest';
import './app/main';

const requires = [
  'ui.router',
  'ngSanitize',
  'ngTable',
  'dndLists',
  'ngToast',
  'uiGmapgoogle-maps',
  'ngFileUpload',
  'ui.bootstrap.datetimepicker',
  'ui.select',
  'ui-notification',
  'ui.dateTimeInput',
  'angular-loading-bar',
  'ngMask',
  
  'app.providers',
  'app.services',
  'app.factories',
  'app.components',
  'app.directives',
  
  'app.guest',
  'app.main',
  CommonUserComponent,
  SidebarMenu,
  Modal
];

angular.module('app', requires)
  .constant('AppConstants', constants)
  .factory('appCache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('app-cache');
  }])
  .config(config)
  .run(appRun);
