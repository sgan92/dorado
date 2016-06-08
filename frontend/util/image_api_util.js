var ImageActions = require('../actions/image_actions');
var ErrorActions = require('../actions/error_actions');

var ImageApiUtil = {
  fetchAllImages: function(){
    $.ajax({
      type: "GET",
      url: "api/images",
      success: function(images){
        ImageActions.receiveAllImages(images);
      },
      error: function(error){
        debugger;
      }
    });
  },

  fetchImage: function(id){
    $.ajax({
      type: "GET",
      url: "api/images/" + id,
      data: {id: id},
      success: function(image){
        ImageActions.receiveImage(image);
      }
    });
  },

  createImagePost: function(image_data, cb){
    $.ajax({
      type: "POST",
      url: "api/images",
      contentType: false,
      processData: false,
      data: image_data,
      success: function(image){
        ImageActions.receiveImage(image);
        cb();
      },
      error: function(error){
        ErrorActions.setErrors("image", error.responseJSON);
      }
    });
  },

  deleteImagePost: function(id){
    $.ajax({
      type: "DELETE",
      url: "api/images/" + id,
      data: {id: id},
      success: function(image){
        ImageActions.removeImage(image);
      },
      error: function(error){
        debugger;
      }
    });
  },

  fetchByUser: function(userId){
    $.ajax({
      type: "GET",
      url: "api/users/" + userId,
      data: {id: userId},
      success: function(user){
        ImageActions.receiveUserForImg(user);
      },
      error: function(error){
        debugger;
      }
    });
  }

};

module.exports = ImageApiUtil;
