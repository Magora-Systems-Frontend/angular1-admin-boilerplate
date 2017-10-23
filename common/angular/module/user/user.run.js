function UserRun($transitions, $user) {

  'ngInject';

  $transitions.onStart({ }, function(trans) {
    let toState = trans.$to();

    if(!toState.data)
      return;

    const access = toState.data.access;
    const loginState = $user.get('login.state');
    if (access && access.length && !$user.isHaveRole(access)) {
      if (!$user.isHaveRole(['MANAGER'])) {
        return trans.router.stateService.target(loginState);
      }
    } else if (loginState === toState.name && $user.isAuthenticated()) {
        return trans.router.stateService.target($user.get('afterLogin.state'));
    }
  });
}

export default UserRun;
