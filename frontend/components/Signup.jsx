var React = require('react');
var SessionStore = require('../stores/session');
var UserApiUtil = require('../util/user_api_util');
var ErrorStore = require('../stores/errors');
var ErrorActions = require('../actions/error_actions');
var Link = require('react-router').Link;

var Signup = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return { username: "", password: "", firstName: "", lastName: "" };
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

  formErrors: function() {
    var errors = ErrorStore.formErrors("signup");

    if (!errors["user"]) {
      return;
    }

    var messages = errors["user"].map(function (errorMsg, i) {
      return ( <li key={ i }>{ errorMsg }</li>);
    });

      return <ul>{ messages }</ul>;
  },

  usernameChange: function(event){
    var username = event.target.value;
    this.setState({ username: username });
  },

  pwChange: function(event){
    var pass = event.target.value;
    this.setState({ password: pass });
  },

  firstChange: function(event){
    var first = event.target.value;
    this.setState({ firstName: first });
  },

  lastChange: function(event){
    var last = event.target.value;
    this.setState({ lastName: last });
  },

  loggedIn: function(){
    if (SessionStore.isUserLoggedIn()){
      this.context.router.push("/");
    }
  },

  handleSubmit: function(click){

    click.preventDefault();

    UserApiUtil.signup({
      username: this.state.username,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });

    this.loggedIn();

  },

  render: function(){

    return (
      <div className="login">

        <img src={window.logo} />
        <input type="text" onChange={this.usernameChange} value={this.state.username} placeholder="username"/>
        <input type="password" onChange={this.pwChange} placeholder="password" />
        <input type="text" onChange={this.firstChange} value={this.state.firstName} placeholder="first name"/>
        <input type="text" onChange={this.lastChange} value={this.state.lastName} placeholder="last name" />
        <button onClick={this.handleSubmit}> ⊚ </button>
        {this.formErrors()}
        <div className ="already">
          <Link to="/login"> Have an account? Log In! </Link>
        </div>

      </div>
    );
  }
});

module.exports = Signup;
