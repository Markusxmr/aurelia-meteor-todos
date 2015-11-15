import {bindable} from 'aurelia-framework';

@bindable('add_list')
@bindable('lists')
export class LeftPanel {

  constructor() {}

  addList() {
    this.add_list();
  }

}
