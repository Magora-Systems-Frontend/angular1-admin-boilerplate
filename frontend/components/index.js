import DateTimeDropDown from "./datetime-dropdown/datetime-dropdown";
import Gmap from "./gmap/gmap";

const componentsModule = angular
  .module('app.components', [])
  .component('datetimeDropdown', DateTimeDropDown)
  .component('gmap', Gmap);

export default componentsModule;