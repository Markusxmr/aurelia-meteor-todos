import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <require from="../AppNotFound"></require>
    <require from="./TodoListHeader"></require>
    <require from="./TodoListItems"></require>

    <div show.bind="!list">
      <app-not-found></app-not-found>
    </div>

    <div class="page lists-show">
      <todo-list-header list.bind="list" tasks_loading.bind="tasks_loading"></todo-list-header>
      <div class="content-scrollable list-items">
        <todo-list-items tasks.bind="tasks"></todo-list-items>
      </div>
    </div>
  </template>
`)

@inject(EventAggregator)
export class TodoListPage {

  tasks   = [];
  list    = {};
  listId  = '';

  constructor(ea) {
    this.ea = ea;
  }

  publish() {
    this.ea.publish('active_list_id', this.listId);
  }

  activate(params) {
    if (params.id) {
      this.listId = params.id;
    }

    this.publish();
    Tracker.autorun(() => this.tracker());
  }

  tracker() {
    this.tasksSubHandle = Meteor.subscribe("todos", this.listId);
    this.list = Lists.findOne({ _id: this.listId });
    this.tasks = Todos.find({ listId: this.listId }, {sort: {createdAt : -1}}).fetch();
    this.tasks_loading = ! this.tasksSubHandle.ready();
  }
}
