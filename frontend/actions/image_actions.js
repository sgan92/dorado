var Dispatcher = require('../dispatcher/dispatcher');
var ImageConstants = require('../constants/image_constants');

var ImageActions = {
  receiveAllImages: function(images){
    Dispatcher.dispatch({
      actionType: ImageConstants.ALL_IMAGES,
      images: images
    });
  },

  receiveImage: function(image){
    Dispatcher.dispatch({
      actionType: ImageConstants.ONE_IMAGE,
      image: image
    });
  },

  removeImage: function(image){
    Dispatcher.dispatch({
      actionType: ImageConstants.REMOVE_IMAGE,
      image: image
    });
  },

  receiveUserForImg: function(user){
    Dispatcher.dispatch({
      actionType: ImageConstants.USER_IMAGES,
      user: user
    });
  }
};

module.exports = ImageActions;
