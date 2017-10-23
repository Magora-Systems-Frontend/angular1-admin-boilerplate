class MainCtrl {
  constructor($user) {
    'ngInject';
    
    this.$user = $user;
    this.isCollapsed = false;
  }
  
  getUserName() {
    const userInfo = this.$user.getUserInfo();
    if(userInfo && userInfo.authInfo && userInfo.authInfo.displayName)
      return this.$user.getUserInfo().authInfo.displayName;
  }
  
  logout() {
    this.$user.logout();
  }
}

export default MainCtrl;
