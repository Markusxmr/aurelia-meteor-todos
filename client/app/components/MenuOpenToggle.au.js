import {inject} from 'aurelia-framework';
import {inlineView} from 'aurelia-templating';
import {EventAggregator} from 'aurelia-event-aggregator';

@inlineView(`
  <template>
    <div class="nav-group">
      <a class="nav-item" click.delegate="toggleMenuOpen()">
        <span class="icon-list-unordered" title="Show menu"></span>
      </a>
    </div>
  </template>
`)

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
