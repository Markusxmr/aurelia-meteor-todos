import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@bindable('current_user')
@bindable('add_list')
@bindable('lists')
//@bindable('active_list_id')
@inject(Router)
export class LeftPanel {

  constructor(router){
    this.router = router;
  }

  addList() {
    Meteor.call("/lists/add", (err, res) => {
      if (err) {
        // Not going to be too fancy about error handling in this example app
        alert("Error creating list.");
        return;
      }
      // Go to the page for the new list
      this.router.navigateToRoute('lists', { list_id: res });
    });
  }

}
