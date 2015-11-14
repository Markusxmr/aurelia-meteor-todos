import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@bindable('user')
@inject(EventAggregator)
export class UserSidebarSection {

  constructor(ea){
    this.ea = ea;
    this.menu_open = false;
    this.self = Tracker;
    //this.publish();
  }

  activate(){

  }

  bind(){
    this.self.autorun(() => {
      if (this.user) {
        this.email = this.user.emails[0].address;
        this.email_username = this.email.substring(0, this.email.indexOf('@'));
      }
    });

    this.ea.publish('abcc', this.menu_open);
  }

  toggleMenuOpen() {
    return this.menu_open = !this.menu_open ;
  }

  logout(){
    Meteor.logout();
  }
}
