import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@bindable('list')
@bindable('tasks_loading')
@inject(Router)
export class TodoListHeader {

  constructor(router){
    this.router = router;
    this.id = '';
    this.title_input = '';
    this.editing_title = false;
  }

  startEditingTitle(){
    this.editing_title = true;
    this.id = this.list._id;
    this.title_input = this.list.name;
  }

  stopEditingTitle(){
    Meteor.call('/lists/updateName', this.id, this.title_input);
    this.editing_title = false;
  }

  cancelEditingTitle(){
    this.editing_title = false;
  }

  onFocus(){
    this.editing_title = true;
  }

  onBlur(){
    this.editing_title = false;
  }

  onChange(){
    this.editing_title = false;
  }

  deleteList(id){
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

  toggleListPrivacy(){
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

  submitNewTask(){
    Meteor.call('/lists/addTask', this.list._id, this.new_task_input, (err, res) => {
      if (err) {
        alert("Failed to add new task.");
        return;
      }

      this.new_task_input = '';
    });
  }
}
