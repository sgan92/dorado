var NotificationActions = require('../actions/notification_actions');
var NotificationApiUtil = {

  fetchNotifications: function(){
    $.ajax({
      type: "GET",
      url: "api/notifications",
      success: function(notifications){
        NotificationActions.receiveAllNotifications(notifications);
      },
      error: function(error){

      }
    });
  },

  addNotification: function(data){
    $.ajax({
      type: "POST",
      url: "api/notifications",
      data: data,
      success: function(notification){
        NotificationActions.receiveNotification(notification)
      },
      error: function(error){

      }
    });
  },

  deleteNotification: function(id, cb){
    $.ajax({
      type: "DELETE",
      url: "api/notifications/"+id,
      success: function(notification){
        NotificationActions.removeNotification(notification)
        cb && cb();
      },
      error: function(error){

      }

    })
  }

}

module.exports = NotificationApiUtil;
