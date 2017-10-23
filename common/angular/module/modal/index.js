import './modal.styl';

import ModalDirective from "./modal/modal";
import ModalHeaderDirective from "./modal-header/modal-header";
import ModalBodyDirective from "./modal-body/modal-body";
import ModalFooterDirective from "./modal-footer/modal-footer";

const requires = [

];

const ModalModule = angular
  .module('modal', requires)
  .directive('modal', ModalDirective)
  .directive('modalHeader', ModalHeaderDirective)
  .directive('modalBody', ModalBodyDirective)
  .directive('modalFooter', ModalFooterDirective)
  .name;

export default ModalModule;