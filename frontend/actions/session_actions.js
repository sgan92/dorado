var SessionConstants = require('../constants/session_constants');
var UserConstants = require('../constants/user_constants');
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
 },

 receiveUsers: function(users){
   Dispatcher.dispatch({
     actionType: UserConstants.DISCOVER,
     users: users
   });
 },

 searchUsers: function(users){
   Dispatcher.dispatch({
     actionType: UserConstants.SEARCH,
     users: users
   });
 }

};

module.exports = SessionActions;
