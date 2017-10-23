import "./sidebar-menu-item.styl";

import SidebarMenuItem from './sidebar-menu-item.directive';

const requires = [
  'ui.router'
];

const SidebarMenuItemModule = angular.module('component.sidebar-menu-item', requires)
  .directive('sidebarMenuItem', SidebarMenuItem)
  .name;

export default SidebarMenuItemModule;