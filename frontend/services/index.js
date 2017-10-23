import Common from "./common";
import Category from "./category";

const servicesModule = angular
  .module('app.services', [])
  .service('Common', Common)
  .service('Category', Category)
  .name;

export default servicesModule;
