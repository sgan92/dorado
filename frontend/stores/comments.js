var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var CommentConstants = require('../constants/comment_constants');
var ImageConstants = require('../constants/image_constants');

var CommentsStore = new Store(Dispatcher);

var _comments = {};

CommentsStore.all = function(image_id){
  var comments = _comments[image_id] || [];
  return comments.slice();
};

CommentsStore.receiveOne = function(comment){
  _comments[comment.image_id] = _comments[comment.image_id] || [];
  _comments[comment.image_id].push(comment);
};

CommentsStore.receiveAll = function(comments){
  if (comments.length !== 0 ){
    _comments[comments[0].image_id] = [];
    comments.map( function(comment){
      _comments[comment.image_id] = _comments[comment.image_id] || [];
      _comments[comment.image_id].push(comment);
    });
  }
};

CommentsStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case CommentConstants.RECEIVE_ONE:
      this.receiveOne(payload.comment);
      this.__emitChange();
      break;
    case CommentConstants.RECIEVE_ALL:
      this.receiveAll(payload.comments);
      this.__emitChange();
      break;
  }
};

module.exports = CommentsStore;
