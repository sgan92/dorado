var Dispatcher = require('../dispatcher/dispatcher');
var UserConstants = require('../constants/user_constants');

var FollowActions = {

  follow: function(follow){
    Dispatcher.dispatch({
      actionType: UserConstants.FOLLOW,
      follow: follow
    })
  },

  unfollow: function(follow){
    Dispatcher.dispatch({
      actionType: UserConstants.UNFOLLOW,
      follow: follow
    })
  }

};

module.exports = FollowActions;
