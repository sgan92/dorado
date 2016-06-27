/* globals Pusher */
var React = require('react');
var ImageStore = require('../stores/images');
var ImageApiUtil = require('../util/image_api_util');
var ImageIndexItem = require('./ImageIndexItem');
var Discover = require('./Discover');
var SessionStore = require('../stores/session');
var Link = require('react-router').Link;

var page = 1;

var ImageIndex = React.createClass({

  getInitialState: function(){
    return ({ images: [] });
  },

  componentDidMount: function(){
    ImageApiUtil.fetchAllImages(page);
    this.isBottom();
    this.listener = ImageStore.addListener(this.photosAdded);
    var pusher = new Pusher('bb66e1752e6b946ffd95', {
      encrypted: true
    });

    var channel = pusher.subscribe('images');
    channel.bind('image_published', function(data) {
      ImageApiUtil.fetchAllImages(page);
    });

    channel.bind('image_deleted', function(data) {
      ImageApiUtil.fetchAllImages(page);
    });
  },

  photosAdded: function(){
    this.setState({ images: ImageStore.all() });
  },

  isBottom: function(){

    if ( SessionStore.currentUser().id !== undefined ){
      $(window).scroll(function() {
       if($(window).scrollTop() + $(window).height() == $(document).height()) {
           ImageApiUtil.fetchAllImages(page + 1);
           page ++;
         }
      });
    }

  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  render: function(){

    var posts = this.state.images.map( function(image){
      return (
        <li key={image.id}>
          <ImageIndexItem post={image}/>
        </li>
      );
    }.bind(this));

    return(
      <div className="Index">
        <Discover />

          <ul >
            {posts}
          </ul>

        <div className="mainLink">
          <Link to="/new">
            <i className="fa fa-camera-retro" aria-hidden="true"></i>
          </Link></div>
        <div className="background"></div>
      </div>
    );
  }
});

module.exports = ImageIndex;
