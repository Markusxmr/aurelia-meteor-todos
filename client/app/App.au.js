import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {inlineView} from 'aurelia-templating';

const show_connection_issues = new ReactiveVar(false);
const connection_issue_timeout = 5000;

@inlineView(`
  <template>
    <require from="./components/LeftPanel"></require>
    <require from="./components/ConnectionIssueDialog"></require>
    <require from="./components/AppLoading"></require>

    <div id="container" class="\${menuOpen ? 'menu-open' : ''} \${appBodyContainerClass}">

      <left-panel lists.bind="lists" add_list.call="addList()"></left-panel>

      <connection-issue-dialog if.bind="disconnected"></connection-issue-dialog>

      <div class="content-overlay" click.delegate="toggleMenuOpen()"></div>

      <div id="content-container">
        <router-view if.bind="!router.isNavigating"></router-view>
        <app-loading if.bind="router.isNavigating"></app-loading>
      </div>

    </div>
  </template>
`)

@inject(EventAggregator)
export class App {
  appBodyContainerClass  = '';
  subsReady              = true;
  menuOpen               = false;
  disconnected           = false;

  constructor(ea: EventAggregator) {
    this.ea = ea;
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
    this.ea.subscribe('toggle_menu', payload => this.menuOpen = payload);
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

  configureRouter(config, router) {

    this.router = router;

    config.title = 'Todos';
    config.map([
      {
        route: ['','lists'],
        moduleId: './components/todo-list/TodoListPage',
        name: 'root',
        href: 'root',
        nav: false
      },
      {
        route: ['','lists/:id'],
        moduleId: './components/todo-list/TodoListPage',
        name: 'lists',
        href: '#lists/:id',
        nav: false
      },
      {
        route: 'auth-join-page',
        moduleId: './components/accounts/AuthJoinPage',
        name: 'auth-join-page',
        nav: false
      },
      {
        route: 'auth-signin-page',
        moduleId: './components/accounts/AuthSigninPage',
        name: 'auth-signin-page',
        nav: false
      }
    ]);
  }
}
