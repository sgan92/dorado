var CommentActions = require('../actions/comment_actions');

var CommentApiUtil = {

  createComment: function(data){
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
      },
      error: function(error){
        console.log(error);
      }
    });
  },

  fetchComments: function(image_id){
    $.ajax({
      type: "GET",
      url: "api/comments",
      data: { comment: {image_id: image_id} },
      success: function(comments){
        CommentActions.receiveComments(comments);
      },
      error: function(error){

      }
    });
  }

};

module.exports = CommentApiUtil;
