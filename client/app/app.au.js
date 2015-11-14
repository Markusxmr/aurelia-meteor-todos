const show_connection_issues = new ReactiveVar(false);
const connection_issue_timeout = 5000;

export class App {
  constructor(){
    //const subsReady = _.all(subHandles, handle => handle.ready());
    this.self = Tracker;
    this.subs_ready = true;
    this.menu_open = false;
    this.app_body_container_class = '';
    //this.disconnected = false;

    if (Meteor.isCordova) {
      this.app_body_container_class += " cordova";
    }

    if (this.menu_open) {
      this.app_body_container_class += " menu-open";
    }

    this.self.autorun(() => {
      Meteor.subscribe('publicLists');
      Meteor.subscribe('privateLists');
      //subsReady: subsReady,
      this.lists = Lists.find({}, { sort: {createdAt: -1} }).fetch();
      this.currentUser = Meteor.user();

      this.disconnected = show_connection_issues.get() && (! Meteor.status().connected);
      setTimeout(() => show_connection_issues.set(true), connection_issue_timeout);

    });

    //this.subscribe();
  }

  /*
  attached(){
    this.ea.subscribe('abcc', payload => {
      console.log('payload '+ payload);
      return this.menu_open = payload;
    });
  }
  */


  getListId() {
    return this.listId = Lists.findOne()._id;
  }

  configureRouter(config, router){

    this.router = router;

    config.title = 'Todos';
    config.map([
      {
        route: ['','lists/:list_id'],
        moduleId: './components/todo-list/todo-list-page',
        name:'lists',
        href: '#lists',
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
