const RowEditHelper = function(){

  return {
    restrict: 'A',
    scope: true,
    controller: ['$scope', function rowEditHelperCompile($scope) {
      if(!$scope.$parent.row.id) {
        $scope.$parent.row.isEditing = true;
      }
    }]
  }
};

export default RowEditHelper;