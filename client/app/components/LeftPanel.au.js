import {bindable} from 'aurelia-framework';
import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <require from="./TodoLists"></require>
    <require from="./accounts/UserSidebarSection"></require>

    <section id="menu">

      <user-sidebar-section></user-sidebar-section>

      <div class="list-todos">
        <a class="link-list-new" click.delegate="addList()">
          <span class="icon-plus"></span>
          New List
        </a>

        <todo-lists lists.bind="lists"></todo-lists>
      </div>
    </section>
  </template>
`)

@bindable('add_list')
@bindable('lists')
export class LeftPanel {
  addList() {
    this.add_list();
  }
}
