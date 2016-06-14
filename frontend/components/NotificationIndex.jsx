var React = require('react');
var NotificationsStore = require('../stores/notifications');
var NotificationApiUtil = require('../util/notification_api_util');
var SessionStore = require('../stores/session');

var NotificationIndex = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function(e){
    var id = e.target.id;
    NotificationApiUtil.deleteNotification(id, this.reRoute);
  },

  reRoute: function(){
    this.context.router.push(this.userURL);
  },

  render: function(){

    var notifications;

    if (this.props.notifications.length !== 0){

      notifications = this.props.notifications.map( function(notification){

        var message = notification.notifier.username + " has " +
          notification.notif_type;

        this.userURL = "/" + notification.notifier.username

        return (

            <li key={notification.id} onClick={this.handleClick} id={notification.id}>
                <img src={notification.image_url}/>

                { message }

            </li>
        );
      }.bind(this));

    } else {
      notifications =
      (<li id = "none">
        No Notifications!
      </li>)
    }

    return(
      <div className="notifications">
        <ul>
          {notifications}
        </ul>
      </div>
    )
  }


});

module.exports = NotificationIndex;
