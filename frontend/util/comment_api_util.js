var CommentActions = require('../actions/comment_actions');

var CommentApiUtil = {

  createComment: function(data, cb){
    $.ajax({
      type: "POST",
      url: "api/comments",
      data: {
        comment: {
          image_id: data.image_id,
          body: data.body
        }
      },
      success: function(comment){
        CommentActions.receiveComment(comment);
        cb && cb();
      },
      error: function(error){
      }
    });
  },

  fetchComments: function(image_id, cb){
    $.ajax({
      type: "GET",
      url: "api/comments",
      data: { comment: {image_id: image_id} },
      success: function(comments){
        CommentActions.receiveComments(comments);
        cb && cb();
      },
      error: function(error){

      }
    });
  }

};

module.exports = CommentApiUtil;
