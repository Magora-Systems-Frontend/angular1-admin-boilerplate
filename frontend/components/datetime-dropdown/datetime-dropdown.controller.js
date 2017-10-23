import moment from "moment";

class DateTimeDropDownCtrl {

  constructor($scope){
    'ngInject';
    this.isOpened = false;
    this.config = {};
    this.config.date = this.date;
    $scope.$watch(() => this.config.date, (newValue, oldValue) => {
      if(newValue)
        this.date = newValue;
    })
  }

  getValue(){
    return moment(this.date, this.inputFormat).format(this.outputFormat)
  }
}

export default DateTimeDropDownCtrl;