var React = require('react');
var Link = require('react-router').Link;
var SessionStore = require('../stores/session');
var ErrorStore = require('../stores/errors');
var ErrorActions = require('../actions/error_actions');
var SessionApiUtil = require('../util/session_api_util');

var Login = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return { username: "", password: "" };
  },

  componentDidMount: function(){
    this.storeToken = SessionStore.addListener(this.loggedIn);
    this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    ErrorActions.clearErrors();
  },

  componentWillUnmount: function () {
    this.storeToken.remove();
    this.errorListener.remove();
  },

  baseErrors: function() {
    var errors = ErrorStore.formErrors("login");

    if (!errors["base"]) {
      return;
    }

    var messages = errors["base"].map(function (errorMsg, i) {
      return ( <li key={ i }>{ errorMsg }</li>);
    });

      return <ul>{ messages }</ul>;
  },

  usernameChange: function(event){
    var newUser = event.target.value;
    this.setState({username: newUser});
  },

  pwChange: function(event){
    var newPass = event.target.value;
    this.setState({password: newPass});
  },

  loggedIn: function(){
    if (SessionStore.isUserLoggedIn()){
      this.context.router.push("/");
    }
  },

  handleSubmit: function(click){

    click.preventDefault();

    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }

    SessionApiUtil.login({
      username: this.state.username,
      password: this.state.password
    });

  },

  guestSubmit: function(click){
    click.preventDefault();
    if (SessionStore.isUserLoggedIn()) {
      this.context.router.push("/");
    }


    SessionApiUtil.login({
      username: "Guest",
      password: "password"
    });

  },

  render: function(){
    return (
      <div className="login">

        <img src={window.logo} />
        <input type="text" onChange={this.usernameChange} placeholder="username" />
        <input type="password" onChange={this.pwChange} placeholder="password" />
        <button onClick={this.handleSubmit}>⊚</button>
        <button onClick={this.guestSubmit} id="guest">GUEST</button>
        <Link to= "/auth/twitter"> Log in with Twitter</Link>

        {this.baseErrors()}

        <div className ="already">
          <Link to="/signup"> Not a Member? Sign Up! </Link>
        </div>

      </div>
    );
  }
});

module.exports = Login;
