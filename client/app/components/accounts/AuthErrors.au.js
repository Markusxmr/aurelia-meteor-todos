import {bindable} from 'aurelia-framework';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <div class="list-errors" if.bind="!!errors">
      <div class="list-item">
        \${errors.none}
        \${errors.email}
        \${errors.password}
      </div>
    </div>
    <span show.bind="!errors"></span>
  </template>
`)

@bindable('errors')
export class AuthErrors {
  errors = {};
}
