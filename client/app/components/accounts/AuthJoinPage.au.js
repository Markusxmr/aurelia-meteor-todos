import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <require from="../MenuOpenToggle"></require>
    <require from="./AuthFormInput"></require>
    <require from="./AuthErrors"></require>

    <div class="page auth">
      <nav>
        <menu-open-toggle></menu-open-toggle>
      </nav>

      <div class="content-scrollable">
        <div class="wrapper-auth">
          <h1 class="title-auth">Join.</h1>
          <p class="subtitle-auth">
            Joining allows you to make private lists
          </p>

          <form submit.delegate="submit()">
            <auth-errors errors.bind="errors"></auth-errors>

            <auth-form-input
              has_error.bind="!!errors.email"
              value.two-way="email"
              type="email"
              name="email"
              label="Your Email"
              icon_class="icon-email">
            </auth-form-input>

            <auth-form-input
              has_error.bind="!!errors.password"
              value.two-way="password"
              type="password"
              name="password"
              label="Password"
              icon_class="icon-lock">
            </auth-form-input>

            <auth-form-input
              has_error.bind="!!errors.confirm"
              value.two-way="confirm"
              type="password"
              name="confirm"
              label="Confirm Password"
              icon_class="icon-lock">
            </auth-form-input>

            <button type="submit" class="btn-primary">
              Join Now
            </button>
          </form>
        </div>

        <div class="link-auth-alt">
          <a route-href="route: auth-signin-page">
            Have an account? Sign in.
          </a>
        </div>
      </div>
    </div>
  </template>
`)

@inject(Router)
export class AuthJoinPage {

  email = '';
  password = '';
  confirm = '';

  constructor(router){
    this.router = router;
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
