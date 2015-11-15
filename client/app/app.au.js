import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

const show_connection_issues = new ReactiveVar(false);
const connection_issue_timeout = 5000;
//const subsReady = _.all(subHandles, handle => handle.ready());

@inject(EventAggregator)
export class App {
  constructor(ea){
    this.ea = ea;
    this.appBodyContainerClass  = '';
    this.subsReady              = true;
    this.menuOpen               = false;
    this.disconnected           = false;

    if (Meteor.isCordova) {
      this.appBodyContainerClass += ' cordova';
    }

    if (this.menuOpen) {
      this.appBodyContainerClass += ' menu-open';
    }

    Tracker.autorun(() => this.tracker());

    setTimeout(() => {
      this.router.navigateToRoute('lists', {id: Lists.findOne()._id});
    }, 3500);

    this.subscribe();
  }

  subscribe() {
    this.ea.subscribe('toggle_menu', payload => {
      this.menuOpen = payload;
    });
  }

  tracker() {
    Meteor.subscribe('publicLists');
    Meteor.subscribe('privateLists');
    //this.subsReady = subsReady;
    this.lists = Lists.find({}, { sort: {createdAt: -1} }).fetch();
    this.disconnected = show_connection_issues.get() && (! Meteor.status().connected);
    setTimeout(() => show_connection_issues.set(true), connection_issue_timeout);
  }

  addList() {
    Meteor.call("/lists/add", (err, res) => {
      if (err) {
        alert("Error creating list.");
        return;
      }
      this.router.navigateToRoute('lists', { id: res });
    });
  }

  configureRouter(config, router){

    this.router = router;

    config.title = 'Todos';
    config.map([
      {
        route: ['','lists'],
        moduleId: './components/todo-list/todo-list-page',
        name:'root',
        href: 'root',
        nav: false
      },
      {
        route: ['','lists/:id'],
        moduleId: './components/todo-list/todo-list-page',
        name:'lists',
        href: '#lists/:id',
        nav: false
      },
      {
        route: 'auth-join-page',
        moduleId: './components/accounts/auth-join-page',
        name: 'auth-join-page',
        nav: false
      },
      {
        route: 'auth-signin-page',
        moduleId: './components/accounts/auth-signin-page',
        name: 'auth-signin-page',
        nav: false
      }
    ]);
  }
}
