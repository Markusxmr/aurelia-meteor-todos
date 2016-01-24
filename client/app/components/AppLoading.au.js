import {inlineView} from 'aurelia-templating';

@inlineView(`
  <template>
    <img src="./img/logo-todos.svg" class="loading-app" />
  </template>
`)

export class AppLoading {
  constructor() {}
}
