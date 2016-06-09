var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var SessionStore = require('./stores/session');
var SessionApiUtil = require('./util/session_api_util');
var App = require('./components/App');
var Login = require('./components/Login');
var Signup = require('./components/Signup');
var ImageForm = require('./components/ImageForm');
var ImageIndex = require('./components/ImageIndex');
var Profile = require('./components/Profile');

var Modal = require("react-modal");

function _ensureLoggedIn(nextState, replace, asyncDoneCallBack){
  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfNotLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfNotLoggedIn);
  }

  function redirectIfNotLoggedIn() {

    if (!SessionStore.isUserLoggedIn()) {
      replace('/login');
    }

    asyncDoneCallBack();
  }

}

function _ensureLoggedOut(nextState, replace, asyncDoneCallBack){

  if (SessionStore.currentUserHasBeenFetched()) {
    redirectIfLoggedIn();
  } else {
    SessionApiUtil.fetchCurrentUser(redirectIfLoggedIn);
  }

  function redirectIfLoggedIn() {

    if (SessionStore.isUserLoggedIn()) {
      replace('/index');
    }

    asyncDoneCallBack();
  }

}

var routes = (
  <Route path="/" component={ App }  >
    <IndexRoute component={ ImageIndex } onEnter={_ensureLoggedIn} />
    <Route path="/login" component={ Login } onEnter={ _ensureLoggedOut}/>
    <Route path="/signup" component={ Signup } onEnter={ _ensureLoggedOut }/>
    <Route path="/new" component={ ImageForm } onEnter={ _ensureLoggedIn }/>
    <Route path="/index" component={ ImageIndex } onEnter={ _ensureLoggedIn }/>
    <Route path="/:username" component= { Profile } />

  </Route>
);




document.addEventListener("DOMContentLoaded", function(){
  Modal.setAppElement(document.body);
  var content = document.getElementById("content");
  ReactDOM.render(<Router history={hashHistory} routes={routes}/>, content);
});
