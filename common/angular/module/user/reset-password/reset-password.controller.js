/**
 * Created by klimova on 09.12.2016.
 * Email: klimova@magora-systems.com
 * Company: Magora Systems LLC
 * Website: magora-systems.com
 */
class ResetPasswordCtrl {
  constructor($user, $scope, $timeout, $stateParams) {
    'ngInject';

    this.$user = $user;
    this.$scope = $scope;
    this.$timeout = $timeout;

    this.error = false;
    this.waitingForResponse = false;
    this.isShowNotification = false;
    this.form = {
      code: $stateParams.check,
      email: $stateParams.login
    };

    this.validators = {
      password: [
        {
          type: 'invalid',
          message: 'The password must be longer than 6 characters',
          rule: (form, field) => field.$error.minlength
        },
        {
          type: 'invalid',
          message: 'The password must be less than 16 characters',
          rule: (form, field) => field.$error.maxlength
        },
        {
          type: 'invalid',
          message: 'Passwords is not equal.',
          rule: (form, field) => !this.doPasswordsMatch()
        }
      ]
    };
  }

  $onDestroy() {
    if (this.timeoutId) {
      this.$timeout.cancel(this.timeoutId);
    }
  }

  doPasswordsMatch() {
    return !this.confirmPassword || this.form.newPassword === this.confirmPassword;
  }

  reset(form) {
    this.waitingForResponse = true;
    this.$user.resetPassword(this.form,
      res => {
        this.isShowNotification = true;
        this.timeoutId = this.$timeout(() => {
          this.signIn();
        }, 2000);
      },
      err => {
        this.errorMsg = 'Something went wrong, please try again later';
        if (err.status === 409 && err.data.code.indexOf('restore_code_is_expired') >= 0) {
          // this.errorMsg = 'It doesn’t exist in the system';
          this.errorMsg = 'Restore code is expired, please get one new.';
        }
        this.error = true;
        this.waitingForResponse = false;
      });
  }

  signIn() {
    const cred = {
      login: this.form.email,
      password: this.form.newPassword
    };
    this.$user.singInToAdminPanel(cred)
      .then(
        data => {},
        () => {
          this.error = true;
        }
      );
  }
}

export default ResetPasswordCtrl;
