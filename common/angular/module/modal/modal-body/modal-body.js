import template from "./modal-body.pug";

const ModalBody = function () {

  return {
    template,
    replace:true,
    restrict: 'E',
    transclude: true
  }
};

export default ModalBody;