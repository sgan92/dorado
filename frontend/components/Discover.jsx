var React = require('react');
var UserApiUtil = require('../util/user_api_util');
var SessionStore = require('../stores/session');
var Link = require('react-router').Link;

var Discover = React.createClass({

  getInitialState: function(){
    UserApiUtil.discoverUsers();
    return { users: {} };
  },

  componentDidMount: function(){
    this.listener = SessionStore.addListener(this.discovered);
  },

  discovered: function(){
    this.setState({ users: SessionStore.discoveredUsers() });
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  render: function(){

    var discovering = Object.keys(this.state.users).map(function (user, index){
      var userLink = "/" + this.state.users[user];
      return (
        <li key={this.state.users[user]}>
          <Link to= {userLink} >
            {user}
          </Link>
        </li>
      );
    }.bind(this));

    return (
      <div id="discover">
        <ul>
          {discovering}
        </ul>
      </div>
    );
  }

});

module.exports = Discover;
