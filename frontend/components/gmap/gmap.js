import template from "./gmap.pug";
import controller from './gmap.controller';
import './gmap.styl';

const bindings = {
	onSelect: "=",
	ngModel: "=",
	isRequired: "=",
	validators: "=",
	ngClick: "&"
};

const Gmap = {
	bindings,
	template,
	controller
};

export default Gmap;