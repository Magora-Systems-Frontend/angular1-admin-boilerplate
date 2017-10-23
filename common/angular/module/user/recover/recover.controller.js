class RecoverCtrl {
  constructor($user, $state) {
    'ngInject';

    this.$user = $user;
    this.$state = $state;
    this.email = "";
    this.emailNotFound = false;
  }

  change(){
    this.emailNotFound = false;
  }

  restore(){
    const { $user, $state, email } = this;

    $user.resetPassword(email).then((response) => {
      if(response.data.data.emailFound)
        $state.go('app.guest.sign-in');
      else
				this.emailNotFound = true;
    });
  }
}

export default RecoverCtrl;
