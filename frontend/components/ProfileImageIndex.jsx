var ProfileSingleImage = require('./ProfileSingleImage');

var React = require('react');

var ProfileImageIndex = React.createClass({

  render: function(){
    var images;

    images = this.props.images.map( function(image){
      debugger;
      return(
          <ProfileSingleImage image={image} key={image.id} username={this.props.username}/>
      );
    }.bind(this));

    return (
      <ul>
        {images}
      </ul>
    );
  }
});

module.exports = ProfileImageIndex;
