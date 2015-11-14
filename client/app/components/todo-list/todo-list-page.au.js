import {inject, bindable} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class TodoListPage {

  constructor(ea){
    this.ea = ea;
    this.tasks = [];
    this.listId = Lists.findOne()._id;
    this.list = {};
    Tracker.autorun(() => this.tracker());
  }

  publish() {
    this.ea.publish('active_list_id', this.listId);
  }

  activate(params){
    if (params.list_id) {
      this.listId = params.list_id;
    }
    this.publish();
    this.tracker();
    Tracker.autorun(() => {
      //this.list = Lists.findOne({ _id: this.listId });
      this.tasks = Todos.find({ listId: this.listId }, {sort: {createdAt : -1}}).fetch();
    });
  }

  tracker() {
    this.tasksSubHandle = Meteor.subscribe("todos", this.listId);
    this.list = Lists.findOne({ _id: this.listId });
    this.tasks_loading = ! this.tasksSubHandle.ready();
  }
}
