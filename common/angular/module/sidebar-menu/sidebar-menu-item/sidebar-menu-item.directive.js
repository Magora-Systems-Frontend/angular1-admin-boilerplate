import controller from "./sidebar-menu-item.controller";
import template from "./sidebar-menu-item.pug";

const bindings = {
  node: "=",
  activeIndex: "@"
};

function SidebarMenuItem() {
  return {
    template,
    bindings,
    controller: ['$state', '$sidebarMenu', '$user', '$scope', controller],
    replace: true,
    controllerAs: '$ctrl',
    bindToController: true
  };
}

export default SidebarMenuItem;