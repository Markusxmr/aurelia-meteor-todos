import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class AuthSigninPage {

  constructor(router){
    this.router = router;
    this.email = '';
    this.password = '';
    this.confirm = '';
  }

  submit() {
    this.errors = {};

    if (this.email === '') {
      this.errors.email = 'Email required';
    }
    if (this.password === '') {
      this.errors.password = 'Password required';
    }

    if ( ! _.isEmpty(this.errors)) {
      return;
    }

    Meteor.loginWithPassword(this.email, this.password, (error) => {
      if (error) {
        this.errors = { 'none': error.reason }
        return;
      }

      this.router.navigateToRoute('lists', { id: Lists.findOne()._id });
    });
  }
  
}
