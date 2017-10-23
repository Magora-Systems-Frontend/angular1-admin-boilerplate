class SidebarMenuItemCtrl {
  constructor($state, $sidebarMenu, $user, $scope) {
    
    this.$state = $state;
    this.$sidebarMenu = $sidebarMenu;
    this.$user = $user;
    this.isOpen = true;
  }
  
  goToState(node) {
    if (!node.state && node.items) {
      this.isOpen = !this.isOpen;
      return;
    }
    
    const {$state} = this;
    
    if (this.isHaveRole(node)) {
      $state.go(node.state, node.params, node.options);
    }
  };
  
  isActive(node) {
    if (!node.state)
      return false;
    
    return this.$state.current.name === node.state;
  };
  
  isHaveRole(state) {
    const {$state, $user} = this;
    var s = $state.get(state.state);
    return s.data && s.data.access && $user.isHaveRole(s.data.access);
  };
}

export default SidebarMenuItemCtrl;
