var React = require('react');
var ImageApiUtil = require('../util/image_api_util');
var ImageStore = require('../stores/images');
var SessionApiUtil = require('../util/session_api_util');
var LikeApiUtil = require('../util/like_api_util');
var SessionStore = require('../stores/session');
var CommentIndex = require('./CommentIndex');

var ModalStyle = require('./ModalStyle');
var Modal = require("react-modal");
var Link = require('react-router').Link;

var ImageIndexItem = React.createClass({

  getInitialState: function(){
    return {
      currentUser: SessionStore.currentUser(),
      likes: ImageStore.allLikes(this.props.post.id),
      likeimg: "",
      modalOpen: false
    };
  },

  componentDidMount: function(){
    this.listener = ImageStore.addListener(this.likeChange);

    if ( ImageStore.userLiked(this.state.currentUser, this.props.post.id) ) {
      this.setState({ likeimg: window.like });
    } else {
      this.setState({ likeimg: window.unlike });
    }

  },

  likeChange: function(){

    if ( ImageStore.userLiked(this.state.currentUser, this.props.post.id) ) {
      this.setState({ likeimg: window.like });
    } else {
      this.setState({ likeimg: window.unlike });
    }

    this.setState({ likes: ImageStore.allLikes(this.props.post.id)});
  },


  componentWillUnmount: function(){
    this.listener.remove();
  },


  handleDelete: function(e){
    e.preventDefault();
    ImageApiUtil.deleteImagePost(this.props.post.id);
  },

  toggleLike: function(){
    if ( ImageStore.userLiked(this.state.currentUser, this.props.post.id) ){
      LikeApiUtil.destroyLike(this.props.post.id);

    } else {
      LikeApiUtil.createLike(this.props.post.id);
    }

  },

  handleLikeView: function(){
    var view;

    var length = Object.keys(this.state.likes).length;

    if ( length > 5){
      view = length;
    } else {
      view = Object.keys(this.state.likes).join(",   ");
    }
    return view;
  },

  handleShare: function(e){
    //link to image show one day

  },

  render: function(){

    var whichAuto;

    if (this.props.post.width > 500){
      whichAuto = <div id="widthOver"><img src={this.props.post.image_url}/></div>;
    } else {
      whichAuto = <div id="widthUnder"><img src={this.props.post.image_url} /></div>;
    }

    var isMaker;

    if(SessionStore.currentUser().id === this.props.post.user.id) {
      isMaker = <button onClick={this.handleDelete} id="delete">Delete</button>;
    } else {
      isMaker = <button onClick={this.handleShare} id="delete">Share</button>;
    }

    var userLink = "/" + this.props.post.user.id;

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
          {whichAuto}
          {isMaker}
          {this.share}
        </div>

        <div id="likecontainer">
          <ul>
            <li>
              <div onClick={this.toggleLike}>
                <img src= {this.state.likeimg} />
              </div>
            </li>

            <li>{this.handleLikeView()}</li>
          </ul>
        </div>

        <div id="blurb" >
          <Link to= {userLink}>
            {this.props.post.user.username}:
          </Link>
            {this.props.post.image_blurb}
        </div>
          <CommentIndex image={this.props.post}/>
      </div>
    );
  }
});

module.exports = ImageIndexItem;
