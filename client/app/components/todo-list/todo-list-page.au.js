import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class TodoListPage {

  constructor(ea){
    this.ea = ea;
    this.tasks = [];
    this.list = {};
    this.listId = '';
  }

  publish() {
    this.ea.publish('active_list_id', this.listId);
  }

  activate(params){
    if (params.id) {
      this.listId = params.id;
    } else {
      this.listId = Lists.findOne()._id;
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
