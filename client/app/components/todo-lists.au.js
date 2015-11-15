import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';

@bindable('lists')
@inject(Router, EventAggregator)
export class TodoLists {

  constructor(router, ea){
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

  subscribe(){
    this.ea.subscribe('active_list_id', payload => {
      return this.active_list_id = payload;
    });
  }

  listTasks(id){
    this.publish();
    this.router.navigateToRoute('lists', { id : id  });
  }

}
