import link from './filepicker.link';
import controller from './filepicker.controller';
import template from './filepicker.pug';

const Filepicker = function () {
  return {
    restrict: 'E',
    scope: {
      onSelect: '=',
      multiple: '@',
      name: '@',
      isRequired: '@',
      label: '@',
    },
    replace: false,
    bindToController: true,
    controllerAs: '$ctrl',
    link,
    template,
    controller
  }
};

export default Filepicker;