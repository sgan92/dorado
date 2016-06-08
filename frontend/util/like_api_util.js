var LikeActions = require('../actions/like_actions');

var LikeApiUtil = {

  createLike: function(image_id){
    $.ajax({
      type: "POST",
      url: "api/like",
      data: { like: {image_id: image_id}},
      success: function(like){
        LikeActions.receiveLike(like);
      },
      error: function(error){
        debugger;
      }
    });
  },

  destroyLike: function(image_id){
    $.ajax({
      type: "DELETE",
      url: "api/like",
      data: { like: {image_id: image_id}},
      success: function(like){
        LikeActions.destroyLike(like);
      },
      error: function(error){
        debugger;
      }
    });
  }

};

module.exports = LikeApiUtil;
