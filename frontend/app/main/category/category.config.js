import template from './category.pug';

function CategoryConfig($stateProvider) {

  'ngInject';

  $stateProvider
    .state('app.main.category', {
      url: 'category',
      template,
      controller: 'CategoryCtrl',
      controllerAs: '$ctrl',
      data: {
        title: 'Category',
        access: ['MANAGER']
      }
    });
}

export default CategoryConfig;
