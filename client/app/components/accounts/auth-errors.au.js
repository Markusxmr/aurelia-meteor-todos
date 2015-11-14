import {bindable} from 'aurelia-framework';

@bindable('errors')
export class AuthErrors {

  constructor(){
    this.errors = {};
    //console.log(this.errors);
  }
}
