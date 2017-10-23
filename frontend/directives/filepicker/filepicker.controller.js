class FilePickerCtrl {

  constructor($scope) {
    'ngInject';
  }

  passElements(params) {
    const {root, fileInput} = params;

    this.root = root;
    this.fileInput = fileInput;
		this.isLoading = false;
  }
}

export default FilePickerCtrl;