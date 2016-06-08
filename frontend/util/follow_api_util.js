var FollowActions = require('../actions/follow_actions');

var FollowApiUtil = {
  follow: function(user_id){
    $.ajax({
      type: "POST",
      url: "api/follow",
      data: { follow: {followee_id: user_id } },
      success: function(follow){
        FollowActions.follow(follow);
      },
      error: function(error){
        debugger;
      }
    });
  },

  unfollow: function(user_id){
    $.ajax({
      type: "DELETE",
      url: "api/follow",
      data: { follow: { followee_id: user_id } },
      success: function(follow){
        FollowActions.unfollow(follow);
      },
      error: function(error){
        debugger;
      }
    });
  }

};

module.exports = FollowApiUtil;
