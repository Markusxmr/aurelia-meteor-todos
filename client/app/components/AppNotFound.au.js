import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <require from="./MenuOpenToggle"></require>

    <div class="page not-found">
      <nav>
        <menu-open-toggle></menu-open-toggle>
      </nav>
      <div class="content-scrollable">
        <div class="wrapper-message">
          <div class="title-message">Page not found</div>
        </div>
      </div>
    </div>
  </template>
`)
export class AppNotFound {}
