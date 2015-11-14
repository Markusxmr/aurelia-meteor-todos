import {bindable} from 'aurelia-framework';

@bindable('tasks')
export class TodoListItems {

  constructor(){
    this.task_being_edited_id = null;
  }

  setTaskBeingEditedId(task_id){
    this.task_being_edited_id = task_id;
  }
}
