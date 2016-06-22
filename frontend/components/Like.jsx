var React = require('react');
var ImageStore = require('../stores/images');
var LikeApiUtil = require('../util/like_api_util');
var Link = require('react-router').Link;

var Like = React.createClass({

  getInitialState: function(){
    return {
      currentUser: this.props.currentUser,
      likes: ImageStore.allLikes(this.props.post.id),
      likeimg: ""
    }
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
      view = Object.keys(this.state.likes).map(function (username, index){
        var userLink = "/" + username;
        return <Link to={userLink} key={index}>{username}</Link>;
      });
    }
    return view;
  },

  render: function(){

    return(
      <ul>
        <li>
            <img src= {this.state.likeimg} onClick={this.toggleLike} />
        </li>

        <li>{this.handleLikeView()}</li>
      </ul>
    )
  }


});

module.exports = Like;
