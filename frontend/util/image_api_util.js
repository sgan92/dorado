var ImageActions = require('../actions/image_actions');
var ErrorActions = require('../actions/error_actions');

var ImageApiUtil = {
  fetchAllImages: function(page){
    $.ajax({
      type: "GET",
      url: "api/images",
      data: {page: page},
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
        debugger;
        ImageActions.receiveImage(image);
        cb && cb();
      },
      error: function(error){
        debugger;
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

  fetchByUser: function(username, cb){
    $.ajax({
      type: "GET",
      url: "api/users/" + username,
      data: {username: username},
      success: function(user){
        ImageActions.receiveUserForImg(user);
        cb && cb();
      },
      error: function(error){
        debugger;
      }
    });
  }

};

module.exports = ImageApiUtil;
