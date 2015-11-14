import {inject} from 'aurelia-framework':
import {Router} from 'aurelia-router';

//const errors = {};

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

    console.log(this.email)
    console.log(this.password)

    if (this.email === '') {
      this.errors.email = 'Email required';
    }
    if (this.password === '') {
      this.errors.password = 'Password required';
    }
    //this.errors = errors;
    console.log(this.errors);
    if ( ! _.isEmpty(this.errors)) {
      // Form errors found, do not log in
      return;
    }
    Meteor.loginWithPassword(this.email, this.password, (error) => {
      if (error) {
        this.errors = { 'none': error.reason }
        return;
      }

      this.router.navigateToRoute('lists', { list_id: Lists.findOne()._id });
    });
  }
}
