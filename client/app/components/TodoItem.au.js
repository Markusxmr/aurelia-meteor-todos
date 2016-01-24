import {bindable} from 'aurelia-framework';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <div class="list-item \${taskBeingEditedId === task._id ? 'editing' : ''} \${task.checked === true ? 'checked': ''}"
                repeat.for="task of tasks">
      <label class="checkbox">
        <input type="checkbox"
               checked.bind="task.checked"
               name="checked"
               click.delegate="onCheckboxChange(task._id, task.checked)"/>

        <span class="checkbox-custom"></span>
      </label>
      <input type="text"
             value.bind="task.text"
             placeholder="Task name"
             focus.trigger="onFocus()"
             blur.trigger="onBlur()"
             change.trigger="onTextChange(task._id, task.text)"
             click.delegate="setTaskBeingEditedId(task._id)" />

      <a class="delete-item" click.delegate="removeThisItem(task._id)">
        <span class="icon-trash"></span>
      </a>
    </div>
  </template>
`)

@bindable('tasks')
export class TodoItem {

  constructor(){
    this.focused = false;
    this.checked = false;
    this.class   = '';
  }

  setTaskBeingEditedId(id) {
    this.taskBeingEditedId = id;
  }

  onFocus() {
    this.focused = true;
    this.class += 'editing';
  }

  onBlur() {
    this.focused = false;
    this.class -= 'editing';
  }

  onTextChange(id, text) {
    this.class -= 'editing';

    setTimeout(() => {
      Meteor.call("/todos/setText", id, text);
    }, 300);
  }

  onCheckboxChange(id, checked) {
    this.checked = ! checked;
    Meteor.call("/todos/setChecked", id, this.checked);
  }

  removeThisItem(id) {
    Meteor.call("/todos/delete", id);
  }
}
