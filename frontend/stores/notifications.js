var Store = require('flux/utils').Store;
var Dispatcher = require('../dispatcher/dispatcher');
var NotificationConstants = require('../constants/notification_constants');

var NotificationsStore = new Store(Dispatcher);

var _notifications = {};

NotificationsStore.all = function(){
  console.log("actually here");
  return Object.keys(_notifications).map( function(id){
    return _notifications[id]
  });

};

NotificationsStore.receiveAllNotifications = function(notifications){
  _notifications = {};
  notifications.map( function(notification){
    _notifications[notification.id] = notification;
  });
};


NotificationsStore.removeNotification = function(notification){
  delete _notifications[notification.id];
};

NotificationsStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case NotificationConstants.ALL_NOTIFICATIONS:
      this.receiveAllNotifications(payload.notifications);
      this.__emitChange();
      break;;
    case NotificationConstants.REMOVE_NOTIFICATION:
      this.removeNotification(payload.notification);
      this.__emitChange();
      break;
  }
};

module.exports = NotificationsStore;
