import {inject} from 'aurelia-framework':
import {Router} from 'aurelia-router';

//const errors = {};

@inject(Router)
export class AuthJoinPage {

  constructor(router){
    this.router = router;
    this.email = '';
    this.password = '';
    this.confirm = '';
  }

  submit(event) {

    this.errors = {};

    if (this.email  === '') {
      this.errors.email = 'Email required';
    }

    if (this.password  === '') {
      this.errors.password = 'Password required';
    }

    if (this.confirm !== this.password) {
      confirm = 'Please confirm your password';
    }

    //this.errors = errors;

    if (! _.isEmpty(this.errors)) {
      // Form errors found, do not create user
      return;
    }

    Accounts.createUser({
      email: this.email,
      password: this.password
    }, (error) => {
      if (error) {
        this.errors = { 'none': error.reason }
        return;
      }

      this.router.navigateToRoute('lists', { list_id: Lists.findOne()._id });
    });
  }
}
