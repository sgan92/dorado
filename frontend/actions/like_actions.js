var Dispatcher = require('../dispatcher/dispatcher');
var LikeConstants = require('../constants/like_constants');

var LikeActions = {

  receiveLike: function(like){
    Dispatcher.dispatch({
      actionType: LikeConstants.LIKE,
      like: like
    });
  },

  destroyLike: function(like){
    Dispatcher.dispatch({
      actionType: LikeConstants.UNLIKE,
      like: like
    });
  }

};

module.exports = LikeActions;
