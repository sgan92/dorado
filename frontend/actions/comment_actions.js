var Dispatcher = require('../dispatcher/dispatcher');
var CommentConstants = require('../constants/comment_constants');

var CommentActions = {

  receiveComment: function(comment){
    Dispatcher.dispatch({
      actionType: CommentConstants.RECEIVE_ONE,
      comment: comment
    });
  },

  receiveComments: function(comments){
    Dispatcher.dispatch({
      actionType: CommentConstants.RECIEVE_ALL,
      comments: comments
    });
  }

};

module.exports = CommentActions;
