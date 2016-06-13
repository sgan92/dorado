var Dispatcher = require('../dispatcher/dispatcher');
var NotificationConstants = require('../constants/notification_constants');

var NotificationActions = {

  receiveAllNotifications: function(notifications){
    Dispatcher.dispatch({
      actionType: NotificationConstants.ALL_NOTIFICATIONS,
      notifications: notifications
    });
  },

  removeNotification: function(notification){
    Dispatcher.dispatch({
      actionType: NotificationConstants.REMOVE_NOTIFICATION,
      notification: notification
    })
  }

};

module.exports = NotificationActions;
