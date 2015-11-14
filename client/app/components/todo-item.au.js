import {bindable} from 'aurelia-framework';

@bindable('tasks')
export class TodoItem {

  constructor(){
    this.focused = false;
    this.checked = false;
    this.class = '';
  }


  setTaskBeingEditedId(id){
    this.task_being_edited_id = id;
  }

  onFocus() {
    this.focused = true;
    this.class += 'editing';
  }

  onBlur() {
    this.focused = false;
    this.class -= 'editing';
    //setTimeout(() => this.task_being_edited_id = null, 75);
  }

  onTextChange(id, text) {
    this.class -= 'editing';

    setTimeout(() => {
      Meteor.call("/todos/setText", id, text);
    }, 300);
  }

  onCheckboxChange(id, checked) {
    // Set to the opposite of the current state
    this.checked = ! checked;
    Meteor.call("/todos/setChecked", id, this.checked);
  }

  removeThisItem(id) {
    Meteor.call("/todos/delete", id);
  }
}
