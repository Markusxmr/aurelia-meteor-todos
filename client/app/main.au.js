export function configure(aurelia){
  aurelia.use
         .standardConfiguration()
         .developmentLogging();
         //.feature('client/app/resources');

  aurelia.start().then(a => a.setRoot('client/app/app'));
}
