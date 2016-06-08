var SessionActions = require('../actions/session_actions');
var ErrorActions = require('../actions/error_actions');

var SessionApiUtil = {
  login: function(data){
    $.ajax({
      type: "POST",
      url: "api/session",
      data: {user: {username: data.username, password: data.password}},
      success: function(user){
        SessionActions.receiveCurrentUser(user);
      },
      error: function(error){
        ErrorActions.setErrors("login", error.responseJSON);
      }
    });
  },

	logout: function (cb) {
		$.ajax({
			url: 'api/session',
			type: 'DELETE',
			success: function () {
        SessionActions.removeCurrentUser();
        cb && cb();
      },
			error: function (error) {

			}
		});
	},

	fetchCurrentUser: function (complete) {
		$.ajax({
			url: 'api/session',
			type: 'GET',
			success: function (currentUser) {
			  SessionActions.receiveCurrentUser(currentUser);
			},
			error: function (error) {

			},
      complete: complete
		});
	}
};

module.exports = SessionApiUtil;
