var SessionConstants = require('../constants/session_constants');
var SessionApiUtil = require('../util/session_api_util');
var SessionStore = require('../stores/session');
var Dispatcher = require('../dispatcher/dispatcher');

var SessionActions = {

  receiveCurrentUser: function (currentUser) {
   Dispatcher.dispatch({
     actionType: SessionConstants.LOGIN,
     currentUser: currentUser
   });
 },

 removeCurrentUser: function () {
   Dispatcher.dispatch({
     actionType: SessionConstants.LOGOUT
   });
 }

};

module.exports = SessionActions;
