import _ from "lodash";

class Category {
  constructor($http, $q) {
    'ngInject'
    
    this.$http = $http;
    this.$q = $q;
  }
  
  getDefaultModel() {
    return {
      name: "",
      order: 0
    }
  }
  
  normalizeCategory(dirtyModel) {
    const clearCategory = _.pick(dirtyModel, [
      'id',
      'name',
      'order'
    ]);
    return _.mergeWith(
      this.getDefaultModel(),
      clearCategory,
      (target, source) => source ? source : target
    )
  };
  
  getCategories(storeId) {
    return this.$http.get(`${process.env.API_ADMIN_URL}/stores/${storeId}/categories`);
  }
  
  createOrUpdateCategory(category, storeId, order) {
    const categoryModel = this.normalizeCategory(category);
    if (!categoryModel.id) {
      categoryModel.order = order;
      return this.$http.post(`${process.env.API_ADMIN_URL}/stores/${storeId}/categories`, categoryModel);
    } else {
      return this.$http.put(`${process.env.API_ADMIN_URL}/stores/${storeId}/categories/${categoryModel.id}`, categoryModel);
    }
  }
  
  deleteCategory(id, storeId) {
    return this.$http.delete(`${process.env.API_ADMIN_URL}/stores/${storeId}/categories/${id}`);
  }
  
  getCategoryById(id) {
    return this.$http.get(`${process.env.API_ADMIN_URL}/stores/default/categories/${id}`);
  }
  
  blockCategory(id, blocked = true, storeId) {
    return this.$http.put(`${process.env.API_ADMIN_URL}/stores/${storeId}/categories/${id}/blockstatus`, {blocked});
  }
  
  savePicture(id, resourceId, storeId) {
    return this.$http.put(`${process.env.API_ADMIN_URL}/stores/${storeId}/categories/${id}/picture`, {resource: resourceId});
  }
}

export default Category;
