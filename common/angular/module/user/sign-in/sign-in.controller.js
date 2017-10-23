class SignInCtrl {
  constructor($user, $rootScope) {
    'ngInject';

    this.$user = $user;
    this.$rootScope = $rootScope;
    this.form = {
      meta: {}
    };
  
  }
  validateOnChange() {
    const isEmailValid =  /[^ ]+@[^ ]+\..+/i.test(this.form.login);
    if(isEmailValid) {
      this.validation = '';
    }
  }
  
  validateEmail() {
    const isEmailValid =  /[^ ]+@[^ ]+\..+/i.test(this.form.login);
    this.validation = !isEmailValid ? 'Please enter valid email address' : '';
  }
  

  signIn() {
    const signInData = Object.assign({}, this.form, {asManager: true});
    this.$user.signIn(signInData, this.rememberMe)
      .then(
        (res) => {
        },
        (err) => {
          console.log(err); // eslint-disable-line no-console
          this.errors = err.errors;
        }
      );
  }
}

export default SignInCtrl;
