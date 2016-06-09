var SessionActions = require('../actions/session_actions');
var ErrorActions = require('../actions/error_actions');
var SessionActions = require('../actions/session_actions');

var UserApiUtil = {

  signup: function(user){
    $.ajax({
      type: "POST",
      url: "api/user",
      data: {user:
        {
          username: user.username,
          password: user.password,
          first_name: user.firstName,
          last_name: user.lastName
        }
      },
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      },
      error: function(error){
        ErrorActions.setErrors("signup", error.responseJSON);
      }
    });
  },

  updateUser: function(data){
    $.ajax({
      type: "PATCH",
      url: "api/user",
      contentType: false,
      processData: false,
      data: data,
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      },
      error: function(error){
        debugger;
      }
    });
  },

  discoverUsers: function(){
    $.ajax({
      type: "GET",
      url: "api/user/discover",
      success: function(users){
        SessionActions.receiveUsers(users);
      }, error: function(error){
        debugger;
      }
    });
  },

  searchUsers: function(search, cb){
    $.ajax({
      type: "GET",
      url: "api/user/search",
      data: {search: search},
      success: function(users){
        SessionActions.searchUsers(users);
        cb && cb();
      },
      error: function(error){
        debugger;
      }
    });
  }

};

module.exports = UserApiUtil;
