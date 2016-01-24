import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <div show.bind="user">
      <div class="btns-group-vertical">
        <a href="#" class="btn-secondary" click.delegate="toggleMenuOpen()">
          <span class="icon-arrow-\${menu_open ? 'up' : 'down'}"></span>
          \${email_username}
        </a>
        <div show.bind="menu_open">
          <a class="btn-secondary" click.delegate="logout()">Logout</a>
        </div>
      </div>
    </div>

    <div show.bind="!user">
      <div class="btns-group">
        <a route-href="route: auth-signin-page" class="btn-secondary">Sign in</a>
        <a route-href="route: auth-join-page" class="btn-secondary">Join</a>
      </div>
    </div>
  </template>
`)

@inject(EventAggregator)
export class UserSidebarSection {

  constructor(ea) {
    this.ea = ea;
    this.menu_open = false;
    this.user = undefined;
  }

  publish() {
    this.ea.publish('abcc', this.menu_open);
  }

  attached(){
    Tracker.autorun(() => {
      this.user = Meteor.user();
      if (this.user) {
        this.email = this.user.emails[0].address;
        this.email_username = this.email.substring(0, this.email.indexOf('@'));
      }
    });

    this.publish();
  }

  toggleMenuOpen() {
    return this.menu_open = !this.menu_open ;
  }

  logout() {
    Meteor.logout();
  }
}
