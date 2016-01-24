import {bindable} from 'aurelia-framework';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <require from="../TodoItem"></require>
    <todo-item tasks.bind="tasks"></todo-item>
  </template>
`)

@bindable('tasks')
export class TodoListItems {

  constructor() {
    this.task_being_edited_id = null;
  }

  setTaskBeingEditedId(task_id) {
    this.task_being_edited_id = task_id;
  }
}
