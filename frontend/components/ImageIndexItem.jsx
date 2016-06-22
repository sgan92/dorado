var React = require('react');
var Like = require('./Like');
var ImageApiUtil = require('../util/image_api_util');
var ImageStore = require('../stores/images');
var SessionApiUtil = require('../util/session_api_util');
var LikeApiUtil = require('../util/like_api_util');
var SessionStore = require('../stores/session');
var CommentIndex = require('./CommentIndex');
var Link = require('react-router').Link;

var ImageIndexItem = React.createClass({

  getInitialState: function(){
    return {
      currentUser: SessionStore.currentUser(),
      modalOpen: false
    };
  },

  handleDelete: function(e){
    e.preventDefault();
    ImageApiUtil.deleteImagePost(this.props.post.id);
  },

  handleShare: function(e){
    window.prompt("Copy to clipboard (Ctrl/Cmd & C)", this.props.post.image_url );
  },

  render: function(){

    var isMaker;

    if(SessionStore.currentUser().id === this.props.post.user.id) {
      isMaker = <button onClick={this.handleDelete} id="delete">Delete</button>;
    } else {
      isMaker = <button onClick={this.handleShare} id="delete">Share</button>;
    }

    var userLink = "/" + this.props.post.user.username;

    return(
      <div className = "post">
        <div id="header">
          <div id="username">

            <Link to= {userLink}>
              {this.props.post.user.username.toUpperCase()}
            </Link>

          </div>
          <div id="timestamps"> {this.props.post.created_at} ago </div>
        </div>

        <div id="parent">
          <img src={this.props.post.image_url}/>
          {isMaker}
          {this.share}
        </div>

        <div id="likecontainer">
          <Like post={this.props.post} currentUser={this.state.currentUser}/>
        </div>

        <div id="blurb" >
          <Link to= {userLink}>
            {this.props.post.user.username}:
          </Link>
            {this.props.post.image_blurb}
        </div>
          <CommentIndex image={this.props.post} user={this.props.post.user}/>
      </div>
    );
  }

});

module.exports = ImageIndexItem;
