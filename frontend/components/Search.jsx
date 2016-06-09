var React = require('react');
var SessionStore = require('../stores/session');
var UserApiUtil = require('../util/user_api_util');
var Link = require('react-router').Link;
var Search = React.createClass({

  getInitialState: function(){
    return { searchResults: {}, searching: "" };
  },

  componentDidMount: function(){
    this.listener = SessionStore.addListener(this.searchResults);
  },

  searchResults: function(){
    this.setState({ searchResults: SessionStore.searchResults() });
  },

  searchUsers: function(e){
    searching = e.target.value;
    UserApiUtil.searchUsers(searching, this.setSearch(searching));
  },

  setSearch: function(searching){
    this.setState({ searching: searching });
  },

  handleClick: function(){
    this.setState({ searching: "" });
  },

  render: function(){

    var results;
    var userPhoto;
    var username;
    var userId;

    results = Object.keys(this.state.searchResults).map( function(user){
      var userObj = this.state.searchResults[user];

      username = userObj.username;
      userId = userObj.id;

      if (userObj.photo === ""){
        userPhoto = window.profilePic;
      } else {
        userPhoto = userObj.photo;
      }

      var userLink = "/" + userId;

      if (this.state.searching !== "" ){
        return (
          <li key={userId}>
            <img src={userPhoto} />
            <Link to= {userLink} onClick={this.handleClick} >
              {username}
            </Link>
          </li>
        );
      } else {
        return "";
      }

    }.bind(this));

    return (
      <div className="searchBar">
        <input type="text" onChange={this.searchUsers} placeholder="Search" value={this.state.searching}/>
        <ul>
          {results}
        </ul>
      </div>
    );

  }
});

module.exports = Search;
