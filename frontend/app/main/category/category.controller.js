import _ from "lodash";

class CategoryCtrl {
  constructor(Category, Common, Food, NgTableParams, $q, $scope, $state, Notification) {
    'ngInject';
    this.Food = Food;
    this.Category = Category;
    this.Common = Common;
    this.categories = [];
    this.$q = $q;
    this.$state = $state;
    this.currentRow = null;
    this.resourceId = null;
    this.visibilityRemoveModal = false;
    this.visibilityFullScreen = false;
    this.saveBlocked = false;
    this.dndDisabled = true;
    this.storeId = localStorage.getItem('storeId');
    this.Notification = Notification;
    
    this.tableParams = new NgTableParams({
      count: -1
    }, {
      filterDelay: 100,
      counts: [],
      getData: (params) => {
        return Category.getCategories(localStorage.getItem('storeId')).then((response) => {
          params.total(response.data.data.items.length);
          let categories = response.data.data.items;
          categories = categories.map((el) => {
            return {
              ...el,
              foodItemsCount: String(el.foodItemsCount)
            }
          });
          
          categories = categories.sort((a, b) => a.order - b.order);
          angular.copy(categories, this.categories);
          this.dndDisabled = false;
          
          console.warn(categories[1].foodItemsCount);
          
          return categories;
        })
      }
    });
    
    this.categoryColumns = [
      {
        field: 'picture',
        title: 'Picture',
        dataType: 'image'
      },
      {
        field: 'name',
        title: 'Name',
        dataType: "text",
        validators: "categoryName, categoryNameMax"
      },
      {
        field: 'foodItemsCount',
        title: 'Amount of food items',
        dataType: "itemsCount"
      },
      {
        field: "action",
        title: "",
        dataType: "command"
      }
    ];
    
    $scope.$watch(() => this.visibilityRemoveModal, (newValue, oldValue) => {
      if (newValue === false)
        this.currentRow = null;
    });
    
    $scope.$watch(() => this.visibilityFullScreen, (newValue, oldValue) => {
      if (newValue === false)
        this.currentRow = null;
    });
  }
  
  reset() {
    this.currentRow = null;
    this.resourceId = null;
    this.dndDisabled = false;
  }
  
  goToCurrentFood(id) {
    this.$state.go('app.main.food', {id});
  }

  add() {
    this.dndDisabled = true;
    const category = this.Category.getDefaultModel();
    category.isEditing = true;
    this.currentRow = category;
    const emptyExist = this.tableParams.data.some((c) => !c.id);
    if (!emptyExist)
      this.tableParams.data.unshift(category);
  }

  cancel(row, rowForm) {
    if (!row.id) {
      this.tableParams.reload();
      this.reset();
      return;
    }
    const originalRow = this.resetRow(row, rowForm);
    angular.extend(row, originalRow);
    this.reset();
  }
  
  removePopup(row) {
    this.Food.getFood(row.id, this.storeId, {query: null}).then((response) => {
      this.food = response.data.data.items.map((el) => el.name).join(', ');
      
      this.currentRow=row;
      this.visibilityRemoveModal=true;
    });
  }
  
  
  del(row) {
    if (!row || !row.id)
      return;

    this.resourceId = null;
    this.Category.deleteCategory(row.id, this.storeId).then(() => {
      this.reset();
      this.tableParams.reload();
    })
  }

  resetRow(row, rowForm) {
    row.isEditing = false;
    rowForm.$setPristine();

    return _.find(this.categories, function (category) {
      return row.id && category.id === row.id;
    });
  }

  save(row, rowForm) {
    const reset = () => {
      this.tableParams.reload();
      this.resourceId = null;
      this.currentRow = null;
      this.dndDisabled = false;
    };
    
    const lastOrder = this.categories.length ? this.categories.pop().order : 0;
    const newOrder = lastOrder + 1;

    this.Category.createOrUpdateCategory(row, this.storeId, newOrder).then((response) => {
      const id = response.data.data ? response.data.data.id : row.id;

      if (this.resourceId) {
        return this.Category.savePicture(id, this.resourceId, this.storeId).then(reset);
      }
      reset();
    })
  }

  blockToggle(row) {
    if (!row.id)
      return;
    this.Category.blockCategory(row.id, !row.blocked, this.storeId).then(() => {
      this.reset();
      this.tableParams.reload();
    })
  }

  dragend($data) {
    this.dndDisabled = true;
    if (!$data.some((row) => row.isEditing)) {
      this.$q.all($data
        .map((category, i) => {
          let c = angular.copy(category);
          c.order = ++i;
          return c;
        })
        .map((category) => this.Category.createOrUpdateCategory(category, this.storeId))
      ).then(() => {
        this.tableParams.reload();
      });
    }
  }
  
  filepick = (file) => {
    const {Common, currentRow} = this;
    const contentType = file.type;
    this.saveBlocked = true;
    const uploadImage = this.$q.defer();
    Common.uploadPicture(contentType, file, this.storeId).then((resp) => {
      Common.checkPictureStatus(resp.resourceId, this.storeId).then((response) => {
        this.Notification.success('Image successfully uploaded');
        this.resourceId = resp.resourceId;
        this.saveBlocked = false;
        uploadImage.resolve();
      });
    });
    return uploadImage.promise;
  };

  openFullScreen(row) {
    this.visibilityFullScreen = true;
    this.currentRow = row;
  }
}

export default CategoryCtrl;
