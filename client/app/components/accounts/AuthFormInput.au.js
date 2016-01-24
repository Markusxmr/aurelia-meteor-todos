import {bindable} from 'aurelia-framework';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <div class="\${class_name}">
      <input type.bind="type" name.bind="name" placeholder.bind="label" value.bind="value"/>
      <span class="\${icon_class}" title.bind="label"></span>
    </div>
  </template>
`)

@bindable('has_error')
@bindable('value')
@bindable('label')
@bindable('icon_class')
@bindable('type')
@bindable('name')
export class AuthFormInput {

  constructor() {
    this.class_name = 'input-symbol';
    if (this.has_error) {
      this.class_name += " error";
    }
  }
}
