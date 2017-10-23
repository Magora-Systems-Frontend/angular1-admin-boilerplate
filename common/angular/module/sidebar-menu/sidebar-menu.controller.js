function SidebarMenuCtrl($sidebarMenu, $state, $user) {

  'ngInject';

  var sidebarMenuCtrl = this;

  sidebarMenuCtrl.items = $sidebarMenu.getItems();

  sidebarMenuCtrl.langExpanded = false;
}

export default SidebarMenuCtrl;