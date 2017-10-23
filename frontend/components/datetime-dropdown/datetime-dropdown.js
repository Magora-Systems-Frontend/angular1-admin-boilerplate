import template from './datetime-dropdown.pug';
import controller from './datetime-dropdown.controller';
import "./datetime-dropdown.styl";

const bindings = {
  date: '=',
  inputFormat: '@',
  outputFormat: '@',
  datetimepickerConfig: '='
};

const DateTimeDropDown = {
  bindings,
  controller,
  template
};

export default DateTimeDropDown;