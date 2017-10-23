import template from './modal-header.pug';

const ModalHeader = function () {

  return {
    template,
    replace: true,
    restrict: 'E',
    scope: {
      title: '@',
      onClose: '&'
    }
  }
};

export default ModalHeader;