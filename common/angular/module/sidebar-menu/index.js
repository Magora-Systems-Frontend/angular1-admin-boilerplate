import $sidebarMenu from './sidebar-menu.provider';
import SidebarMenu from './sidebar-menu.component';

import SidebarMenuItemModule from './sidebar-menu-item';

const requires = [
  'ui.router',
  SidebarMenuItemModule
];

const SidebarMenuModule = angular.module('component.sidebar-menu', requires)
  .provider('$sidebarMenu', $sidebarMenu)
  .component('sidebarMenu', SidebarMenu)
  .name;

export default SidebarMenuModule;