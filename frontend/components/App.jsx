var React = require('react');
var SessionStore = require('../stores/session');
var SessionApiUtil = require('../util/session_api_util');
var Search = require('./Search');
var Link = require('react-router').Link;

var App = React.createClass({

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
    SessionApiUtil.fetchCurrentUser();
    this.listener = SessionStore.addListener(this.forceUpdate.bind(this));
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  handleIndex: function(){
    this.context.router.push("/index");
  },

  render: function(){
    var include;
    var search;
    var userLink = "/" + SessionStore.currentUser().username;

    if (SessionStore.isUserLoggedIn()){
      search = <Search />;

      include = (
        <div>
            <nav>
              <div onClick={this.handleIndex}><img src={window.logo}/></div>
              <div onClick={this.handleIndex} className="logo"><img src={window.icon}/></div>

              {search}

              <Link to={userLink}>
                <h1>{SessionStore.currentUser().first_name}</h1>
              </Link>
              <button onClick={this.logOut}>Logout</button>
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
