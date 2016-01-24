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
          <h1 class="title-auth">Sign In.</h1>
          <p class="subtitle-auth" >
            Signing in allows you to view private lists
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

            <button type="submit" class="btn-primary">
              Sign in
            </button>
          </form>
        </div>

        <div class="link-auth-alt">
          <a route-href="route: auth-join-page">
            Need an account? Join Now.
          </a>
        </div>
      </div>
    </div>
  </template>
`)

@inject(Router)
export class AuthSigninPage {

  email = '';
  password = '';
  confirm = '';

  constructor(router) {
    this.router = router;
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
        this.errors = { 'none': error.reason };
        return;
      }

      this.router.navigateToRoute('lists', { id: Lists.findOne()._id });
    });
  }
}
