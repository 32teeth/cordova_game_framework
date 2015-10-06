/*
** @author Eugene Andruszczenko
** @version 0.1
** @date September 18th, 2015
** @description 
** app.js
*/
var app = {
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    /*
    ** @prop ids {object}
    ** @desc ids for admob
    */
    var ids = {
      Android:{
        banner:"ca-app-pub-8736254534379828/1035093395",
        interstitial:"ca-app-pub-8736254534379828/8558360195"
      },
      iOS:{
        banner:"ca-app-pub-8736254534379828/6942026199",
        interstitial:"ca-app-pub-8736254534379828/3988559795"
      }
    }   
    ads.ids = ids[device.platform];
    ads.interstitial();
    game.init();
  }
};
app.initialize();