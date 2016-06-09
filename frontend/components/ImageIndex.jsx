var React = require('react');
var ImageStore = require('../stores/images');
var ImageApiUtil = require('../util/image_api_util');
var ImageIndexItem = require('./ImageIndexItem');
var Discover = require('./Discover');
var Link = require('react-router').Link;

var ImageIndex = React.createClass({

  getInitialState: function(){
    return ({ images: [] });
  },

  componentDidMount: function(){
    ImageApiUtil.fetchAllImages();
    this.listener = ImageStore.addListener(this.photosAdded);
  },

  photosAdded: function(){
    this.setState({ images: ImageStore.all() });
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

        <div className="mainLink"><Link to="/new">+</Link></div>
        <div className="background"></div>
      </div>
    );
  }
});

module.exports = ImageIndex;
