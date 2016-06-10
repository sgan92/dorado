var React = require('react');
var ImageStore = require('../stores/images');
var ImageApiUtil = require('../util/image_api_util');
var ImageIndexItem = require('./ImageIndexItem');
var Discover = require('./Discover');
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
  },

  photosAdded: function(){
    this.setState({ images: ImageStore.all() });
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  isBottom: function(){
    $(window).scroll(function() {
     if($(window).scrollTop() + $(window).height() == $(document).height()) {
         ImageApiUtil.fetchAllImages(page + 1);
         page ++;
       }
    });
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
