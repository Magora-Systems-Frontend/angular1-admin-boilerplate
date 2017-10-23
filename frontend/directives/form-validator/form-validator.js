import link from './form-validator.link';

const FormValidator = function (Validators, ngToast){

  'ngInject';

  return {
    require: 'ngModel',
    link: link(Validators, ngToast)
  }
};

export default FormValidator;