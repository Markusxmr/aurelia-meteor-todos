import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class UserSidebarSection {

  constructor(ea){
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

  logout(){
    Meteor.logout();
  }
}
