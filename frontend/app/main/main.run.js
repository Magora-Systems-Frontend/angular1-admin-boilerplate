function MainRun($sidebarMenu, $rootScope, $state) {
  
  'ngInject';
  
  $rootScope.isState = function (state) {
    return $state.current.name === state;
  };
  
  $sidebarMenu.addItems([
    {
      icon: 'tags',
      state: 'app.main.category',
      text: 'Categories',
      access: ['MANAGER']
    },
    {
      icon: 'user',
      state: 'app.main.user',
      text: 'Employees',
      access: ['MANAGER']
    },
    {
      icon: 'cutlery',
      state: 'app.main.station',
      text: 'Stations',
      access: ['MANAGER']
    }
  ]);
}

export default MainRun;
