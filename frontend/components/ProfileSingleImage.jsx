var React = require('react');
var Modal = require("react-modal");
var ModalStyle = require('./ModalStyle');
var CommentIndex = require('./CommentIndex');
var SessionStore = require('../stores/session');
var ImageApiUtil = require('../util/image_api_util');
var ImageStore = require('../stores/images');
var ImageModalStyle = require('./ImageModalStyle');

var ProfileSingleImage = React.createClass({
  getInitialState: function(){
    return {
      modalOpen: false
    };
  },

  handleClick: function(){
    ImageApiUtil.fetchByUser(this.props.username, this.modalOpen);
  },

  modalOpen: function(){
    this.setState({ modalOpen: true });
  },

  onModalClose: function(){
    this.setState({ modalOpen: false });
  },

  render: function(){
    return (
      <div>
        <li key={this.props.image.id} onClick={this.handleClick}>
          <img src={this.props.image.image_url} />
          <h3>{this.props.image.likes.length}♥ {this.props.image.comments.length}☁ </h3>
        </li>


        <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.onModalClose}
        style={ImageModalStyle}
        onAfterOpen={this.onModalOpen}>

        <div className="ImageShow">
          <img src={this.props.image.image_url}/>
          <h3>{this.props.image.username} {this.props.image.image_blurb}</h3>

          <div className="Comments">
            <CommentIndex image={this.props.image}/>


            <button onClick={this.onModalClose} id="close">Close</button>
          </div>
        </div>


        </Modal>
      </div>
    );

  }
});

module.exports = ProfileSingleImage;
