var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var ImageConstants = require('../constants/image_constants');
var LikeConstants = require('../constants/like_constants');

var ImageStore = new Store(Dispatcher);

var _posts = {};
var _likes = {};
var _images = [];
var _user = {};

ImageStore.all = function(){
  return Object.keys(_posts).reverse().map( function(postId){
    return _posts[postId];
  });
};

ImageStore.receiveAllImages = function(images){
  _posts = {};
  images.map( function(image){
    _posts[image.id] = image;
  });
};

ImageStore.receiveImage = function(image){
  _posts[image.id] = image;
};

ImageStore.removeImage = function(image){
  delete _posts[image.id];
};

ImageStore.like = function(imageId, username){
  _posts[imageId].likeusers = _posts[imageId].likeusers || {};
  _posts[imageId].likeusers[username] = true;
};

ImageStore.unLike = function(imageId, username){
  delete _posts[imageId].likeusers[username];
};

ImageStore.allLikes = function(imageId){
   _likes = _posts[imageId].likeusers || {};
   return _likes;
};

ImageStore.userLiked = function(user, imageId){
  return Object.keys(ImageStore.allLikes(imageId)).indexOf(user.username) !== -1;
};

ImageStore.userImages = function(user){
  _user = user;
};

ImageStore.user = function(){
  _user = _user || {};
  return _user;
};

ImageStore.profileImages = function(){
  _user.images = _user.images || [];
  return _user.images;
};

ImageStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case ImageConstants.ALL_IMAGES:
      this.receiveAllImages(payload.images);
      this.__emitChange();
      break;
    case ImageConstants.ONE_IMAGE:
      this.receiveImage(payload.image);
      this.__emitChange();
      break;
    case ImageConstants.REMOVE_IMAGE:
      this.removeImage(payload.image);
      this.__emitChange();
      break;
    case LikeConstants.LIKE:
      this.like(payload.like.image_id, payload.like.user.username);
      this.__emitChange();
      break;
    case LikeConstants.UNLIKE:
      this.unLike(payload.like.image_id, payload.like.user.username);
      this.__emitChange();
      break;
    case ImageConstants.USER_IMAGES:
      this.userImages(payload.user);
      this.__emitChange();
      break;
  }
};

module.exports = ImageStore;
