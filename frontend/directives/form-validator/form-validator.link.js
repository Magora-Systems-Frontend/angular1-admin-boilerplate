export default function (Validators, ngToast) {
  return (scope, elm, attrs, ctrl) => {
    attrs.formValidator.replace(/\s/g, '').split(',').forEach((name) => {
      if (Validators[name])
        ctrl.$validators[name] = (modelValue, viewValue) => {
          if (ctrl.$isEmpty(modelValue)) {
            return true;
          }

          const isValid = Validators[name].rule(modelValue, viewValue, ctrl);

          if(!isValid && Validators[name].message)
            ngToast.create({
              content: `<div><p>${Validators[name].message}</p></div>`,
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
              timeout: 5000,
              className: 'danger'
            });

          return isValid;
      };
    });
  }
}