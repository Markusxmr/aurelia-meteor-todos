import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <require from="../MenuOpenToggle"></require>

    <nav show.bind="editing_title">
      <form class="list-edit-form" submit.delegate="stopEditingTitle()">
        <input type="text"
               name="name"
               value.bind="title_input"
               change.trigger="onChange()"
               blur.trigger="onBlur()"
               autofocus />

        <div class="nav-group right">
          <a class="nav-item" click.delegate="cancelEditingTitle()">
            <span class="icon-close" title="Cancel"></span>
          </a>
        </div>
      </form>

      <form class="todo-new input-symbol" submit.delegate="submitNewTask()">
        <input type="text" name="text" value.bind="new_task_input" placeholder="Type to add new tasks" />
        <span class="icon-add"></span>
      </form>
    </nav>

    <nav show.bind="list && !editing_title"> <!-- && ! tasks_loading -->
      <menu-open-toggle></menu-open-toggle>
      <h1 class="title-page" click.delegate="startEditingTitle()">
        <span class="title-wrapper">\${list.name}</span>
        <span class="count-list">\${list.incompleteCount}</span>
      </h1>
      <div class="nav-group right">
        <div class="nav-item options-mobile">
          <select class="list-edit">
            <option disabled>Select an action</option>

              <div show.bind="list.userId">
                <option value="public">Make Public</option> :
                <option value="private">Make Private</option>
              </div>

            <option value="delete">Delete</option>
          </select>
          <span class="icon-cog"></span>
        </div>
        <div class="options-web">

          <a class="nav-item" click.delegate="toggleListPrivacy()">
            <div show.bind="list.userId">
              <span class="icon-lock" title="Make list public"></span>
            </div>
            <div show.bind="!list.userId">
              <span class="icon-unlock" title="Make list private"></span>
            </div>
          </a>
          <a class="nav-item" click.delegate="deleteList(list._id)">
            <span class="icon-trash" title="Delete list"></span>
          </a>
        </div>
      </div>

      <form class="todo-new input-symbol" submit.delegate="submitNewTask()">
        <input type="text" name="text" value.bind="new_task_input" placeholder="Type to add new tasks" />
        <span class="icon-add"></span>
      </form>
    </nav>

    <nav show.bind="!list">
      <div class="wrapper-message">
        <div class="title-message">Loading tasks...</div>
      </div>
    </nav>

  </template>
`)

@bindable('list')
@bindable('tasks_loading')
@inject(Router)
export class TodoListHeader {

  id = '';
  title_input = '';
  editing_title = false;

  constructor(router) {
    this.router = router;
  }

  startEditingTitle() {
    this.editing_title = true;
    this.id = this.list._id;
    this.title_input = this.list.name;
  }

  stopEditingTitle() {
    Meteor.call('/lists/updateName', this.id, this.title_input);
    this.editing_title = false;
  }

  cancelEditingTitle() {
    this.editing_title = false;
  }

  onFocus() {
    this.editing_title = true;
  }

  onBlur() {
    this.editing_title = false;
  }

  onChange() {
    this.editing_title = false;
  }

  deleteList(id) {
    this.error_messages = {
      'not-logged-in': 'Please sign in or create an account to make private lists.',
      'final-list-delete': 'Sorry, you cannot delete the final public list!'
    }

    this.message = `Are you sure you want to delete the list ${this.list.name}?`;
    if (confirm(this.message)) {
      Meteor.call("/lists/delete", id, (err, res) => {
        if (err) {
          alert(this.error_messages[err.error]);
          return;
        }

        this.router.navigateToRoute('lists', {id: Lists.findOne()._id});
      });
    }
  }

  toggleListPrivacy() {
    this.error_messages = {
      'not-logged-in': 'Please sign in or create an account to make private lists.',
      'final-list-private': 'Sorry, you cannot make the final public list private!',
    };

    Meteor.call("/lists/togglePrivate", this.list._id, (err, res) => {
      if (err) {
        alert(this.error_messages[err.error]);
      }
    });
  }

  submitNewTask() {
    Meteor.call('/lists/addTask', this.list._id, this.new_task_input, (err, res) => {
      if (err) {
        alert("Failed to add new task.");
        return;
      }

      this.new_task_input = '';
    });
  }
}
