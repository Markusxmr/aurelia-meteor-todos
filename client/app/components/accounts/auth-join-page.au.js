import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

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

    if (! _.isEmpty(this.errors)) {
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

      this.router.navigateToRoute('lists', { id: Lists.findOne()._id });
    });
  }
  
}
