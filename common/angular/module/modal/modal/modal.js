import template from "./modal.pug";

const Modal = function () {

  return {
    template,
    restrict: 'E',
    transclude: true,
    replace: true,
    scope: {
      visible: '='
    }
  }
};

export default Modal;