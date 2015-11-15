if (Meteor.isClient){
    Meteor.startup(() => {
      System.import('aurelia-bootstrapper')
          .then(() =>{
          })
          .catch( err => {
              console.log(err);
          });
    });
}
