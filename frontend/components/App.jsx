var React = require('react');
var SessionStore = require('../stores/session');
var SessionApiUtil = require('../util/session_api_util');
var Search = require('./Search');
var NotificationIndex = require('./NotificationIndex');
var NotificationApiUtil = require('../util/notification_api_util');
var NotificationsStore = require('../stores/notifications');
var Link = require('react-router').Link;

var App = React.createClass({

  getInitialState: function(){
    return { notifs: "off", notifications: NotificationsStore.all() };
  },

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  logOut: function(click){
    click.preventDefault();
    SessionApiUtil.logout(function () {
      this.context.router.push("/login");
    }.bind(this));
  },

  componentDidMount: function(){
    if ( SessionStore.currentUser().id !== undefined ) {
      NotificationApiUtil.fetchNotifications();
    }
    this.notifListener = NotificationsStore.addListener(this.notified);
    this.listener = SessionStore.addListener(this.forceUpdate.bind(this));

    this.pusher = new Pusher('bb66e1752e6b946ffd95', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('notifications_' + SessionStore.currentUser().id);
    channel.bind('notify', function(data) {
      NotificationApiUtil.fetchNotifications();
    }.bind(this));

  },

  notified: function(){
    this.setState({ notifications: NotificationsStore.all() });
  },

  componentWillReceiveProps: function(){
    if ( SessionStore.currentUser().id !== undefined ) {
      NotificationApiUtil.fetchNotifications();
    }

  },

  componentWillUnmount: function(){
    this.listener.remove();
    this.notifListener.remove();
    this.pusher.unsubscribe('notifications_' + SessionStore.currentUser().id);
    this.pusher.disconnect();
  },

  handleIndex: function(){
    this.context.router.push("/index");
  },

  notifsOn: function(){
    if (this.state.notifs === "off"){
      this.setState({ notifs: "on" });
    } else {
      this.setState({ notifs: "off" });
    }
  },

  render: function(){
    var include;
    var search;
    var userLink = "/" + SessionStore.currentUser().username;
    var notifications;
    var num_notifs;

    if (this.state.notifs === "on") {
      notifications = <NotificationIndex notifications={this.state.notifications}/>;
    }


    if (this.state.notifications.length !== 0){
      num_notifs = (
        <div id="env">
          <h1>{this.state.notifications.length}</h1>
          <i className="fa fa-envelope-o" aria-hidden="true" onClick={this.notifsOn}>
            {notifications}
          </i>
        </div>
      )
    } else {
      num_notifs = (
        <div id="emptyEnv">
          <i className="fa fa-envelope-o" aria-hidden="true" onClick={this.notifsOn}>
            {notifications}
          </i>
        </div>
      )
    }

    if (SessionStore.isUserLoggedIn()){
      search = <Search />;

      include = (
        <div>
            <nav>
              <div onClick={this.handleIndex}><img src={window.logo}/></div>
              <div onClick={this.handleIndex} className="logo"><img src={window.icon}/></div>

              {search}

              <Link to={userLink}>
                <h1><i className="fa fa-user" aria-hidden="true"></i></h1>
              </Link>

              {num_notifs}

              <button onClick={this.logOut}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
            </nav>

        </div>
      );
    }

    return(
      <header>

          {include}


        {this.props.children}

      </header>
    );
  }
});

module.exports = App;
