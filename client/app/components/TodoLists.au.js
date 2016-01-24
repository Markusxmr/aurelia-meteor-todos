import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <div repeat.for="list of lists">
      <a click.delegate="listTasks(list._id)"
         class="list-todo \${active_list_id === list._id ? 'active' : ''}">
        \${list.name}
        <span class="count-list" show.bind="!!list.incompleteCount">
          \${list.incompleteCount}
        </span>
      </a>
    </div>
  </template>
`)

@bindable('lists')
@inject(Router, EventAggregator)
export class TodoLists {

  constructor(router, ea) {
    this.router = router;
    this.ea = ea;
    this.active_list_id = '';
    this.incomplete_count = false;
    this.subscribe();
  }

  publish() {
    this.menuOpen = false;
    this.ea.publish('toggle_menu', this.menuOpen);
  }

  subscribe() {
    this.ea.subscribe('active_list_id', payload => this.active_list_id = payload);
  }

  listTasks(id) {
    this.publish();
    this.router.navigateToRoute('lists', { id : id  });
  }
}
