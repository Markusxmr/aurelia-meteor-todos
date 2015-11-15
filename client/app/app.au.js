const show_connection_issues = new ReactiveVar(false);
const connection_issue_timeout = 5000;
//const subsReady = _.all(subHandles, handle => handle.ready());

export class App {
  constructor(){
    this.appBodyContainerClass  = '';
    this.subsReady              = true;
    this.menuOpen               = false;
    this.disconnected           = false;

    if (Meteor.isCordova) {
      this.appBodyContainerClass += " cordova";
    }

    if (this.menuOpen) {
      this.appBodyContainerClass += " menu-open";
    }

    Tracker.autorun(() => this.tracker());
  }

  tracker() {
    Meteor.subscribe('publicLists');
    Meteor.subscribe('privateLists');
    //this.subsReady = subsReady;
    this.lists = Lists.find({}, { sort: {createdAt: -1} }).fetch();
    //let listId = Lists.findOne()._id;  
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
