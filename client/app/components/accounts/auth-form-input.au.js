import {bindable} from 'aurelia-framework';

@bindable('has_error')
@bindable('value')
@bindable('label')
@bindable('icon_class')
@bindable('type')
@bindable('name')
export class AuthFormInput {

  constructor(){
    this.class_name = 'input-symbol';
    if (this.has_error) {
      this.class_name += " error";
    }
  }
}
