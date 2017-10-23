import template from './modal-footer.pug';

const ModalFooter = function(){

  return {
    template,
    replace:true,
    restrict: 'E',
    transclude: true
  }
};

export default ModalFooter;