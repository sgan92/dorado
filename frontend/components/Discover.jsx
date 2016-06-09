var React = require('react');
var UserApiUtil = require('../util/user_api_util');
var FollowApiUtil = require('../util/follow_api_util');
var SessionStore = require('../stores/session');
var ImageApiUtil = require('../util/image_api_util');
var Link = require('react-router').Link;

var followings = {};

var Discover = React.createClass({

  getInitialState: function(){
    UserApiUtil.discoverUsers();
    return { users: {}, userFollowing: {} };
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

  followUser: function(e){
    var userId = e.currentTarget.id;
    FollowApiUtil.follow(userId, ImageApiUtil.fetchAllImages);
    followings[userId] = true;
    this.setState({ userFollowing: followings });
  },

  buttonVal: function(userId){
    var button;
    if (this.state.userFollowing.hasOwnProperty(userId)){
      button = "Following";
    } else {
      button = "Follow";
    }
    return button;
  },

  render: function(){

    var discovering = Object.keys(this.state.users).map(function (Id, index){
      userId = this.state.users[Id].id;

      var username = this.state.users[Id].username;

      var photo;

      if (this.state.users[Id].photo === ""){
        photo = window.profilePic;
      } else {
        photo = this.state.users[Id].photo;
      }

      var name = this.state.users[Id].first_name + " " +
        this.state.users[Id].last_name;

      var userLink = "/" + username;

      var disabled = "";

      if (this.buttonVal(userId)==="Following") {
        disabled= "disabled";
      }

      return (
        <li key={index}>
          <img src={photo} />
          <Link to= {userLink} >
            {username}
          </Link>
          <h4>{name}</h4>
          <button disabled={disabled} id={this.state.users[Id].id}
            onClick={this.followUser}>
            {this.buttonVal(this.state.users[Id].id)}
          </button>
        </li>
      );
    }.bind(this));

    return (
      <div className="discover">
        <ul>
          <h2>SUGGESTIONS FOR YOU</h2>
          {discovering}
        </ul>
      </div>
    );
  }

});

module.exports = Discover;
