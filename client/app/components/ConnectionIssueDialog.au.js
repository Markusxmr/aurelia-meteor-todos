import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <div class="notifications">
      <div class="notification">
        <span class="icon-sync"></span>
        <div class="meta">
          <div class="title-notification">Trying to connect</div>
          <div class="description">
            There seems to be a connection issue
          </div>
        </div>
      </div>
    </div>
  </template>
`)

export class ConnectionIssueDialog {constructor() {}}
