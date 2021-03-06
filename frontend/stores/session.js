var Dispatcher = require('../dispatcher/dispatcher');
var Store = require('flux/utils').Store;
var SessionConstants = require('../constants/session_constants');
var UserConstants = require('../constants/user_constants');

var SessionStore = new Store(Dispatcher);

var _currentUser = {};
var _users = {};
var _searches = {};
var _currentUserHasBeenFetched = false;

function _login(currentUser){
  _currentUser = currentUser;
  _currentUserHasBeenFetched = true;
}

function _logout(){
  _currentUser = {};
  _currentUserHasBeenFetched = true;
}

SessionStore.currentUser = function(){
  return Object.assign({}, _currentUser);
};

SessionStore.currentUserHasBeenFetched = function(){
  return _currentUserHasBeenFetched;
};

SessionStore.isUserLoggedIn = function(){
  return !!_currentUser.id;
};

SessionStore.followUser = function(follow){
  _currentUser.followers =  _currentUser.followers || {};
  _currentUser.followers[follow.follower.username] = true;
};

SessionStore.discoveredUsers = function(){
  return _users;
};

SessionStore._setDiscovered = function(users){
  var userObj = {};
  users.map( function(user){
    userObj[user.id] = user;
  });
  _users = userObj;
};

SessionStore._setSearch = function(users){
  _searches = {};
  users.map( function(user){
    _searches[user.id] = user;
  });
};

SessionStore.searchResults = function(){
  return _searches;
};

SessionStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case SessionConstants.LOGIN:
      _login(payload.currentUser);
      break;
    case SessionConstants.LOGOUT:
      _logout();
      break;
    case UserConstants.FOLLOW:
      this.followUser(payload.follow);
      this.__emitChange();
      break;
    case UserConstants.UNFOLLOW:
      this.__emitChange();
      break;
    case UserConstants.DISCOVER:
      this._setDiscovered(payload.users);
      this.__emitChange();
      break;
    case UserConstants.SEARCH:
      this._setSearch(payload.users);
      this.__emitChange();
      break;
  }
  this.__emitChange();
};

module.exports = SessionStore;
