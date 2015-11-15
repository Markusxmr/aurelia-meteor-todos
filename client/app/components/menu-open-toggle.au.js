import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class MenuOpenToggle {
  constructor(ea) {
    this.ea = ea;
    this.menuOpen = false;
  }

  toggleMenuOpen() {
    this.menuOpen = !this.menuOpen;
    this.ea.publish('toggle_menu', this.menuOpen);
  }
}
