import controller from "./sidebar-menu.controller";
import template from "./sidebar-menu.jade";

const bindings = {
  title: "@"
};

const SidebarMenu = {
  bindings,
  template,
  controller
};

export default SidebarMenu;