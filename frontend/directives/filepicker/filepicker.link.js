const FilepickerLink = function ($scope, $element, $attrs, $ctrl) {
  const root = $element[0];
  const fileInput = root.querySelector("input[type=file]");

  const multiple = !!($scope.multiple || false);

  $ctrl.passElements({root, fileInput});

	$ctrl.label = $ctrl.label || "upload";

  fileInput.addEventListener('change', (event) => {
    const param = multiple ? event.target.files : event.target.files[0];

    if (param && $ctrl.onSelect) {
			$ctrl.isLoading = true;
      $ctrl.onSelect(param).then((response) => {
				$ctrl.isLoading = false;
        return response;
      });
    }
  });
};

export default FilepickerLink;