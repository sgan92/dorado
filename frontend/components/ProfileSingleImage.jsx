var React = require('react');
var Modal = require("react-modal");
var ModalStyle = require('./ModalStyle');
var CommentIndex = require('./CommentIndex');
var CommentApiUtil = require('../util/comment_api_util');
var ImageModalStyle = require('./ImageModalStyle');
var Like = require('./Like');

var ProfileSingleImage = React.createClass({
  getInitialState: function(){
    return {
      modalOpen: false
    };
  },

  handleClick: function(){
    CommentApiUtil.fetchComments(this.props.image.id, this.openModal);
  },

  openModal: function(){
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
          <h3>{this.props.image.likes.length}♥ {this.props.image.comments.length} <i className="fa fa-comment" aria-hidden="true"></i> </h3>
        </li>


        <Modal
        isOpen={this.state.modalOpen}
        onRequestClose={this.onModalClose}
        style={ImageModalStyle}
        onAfterOpen={this.onModalOpen}>

        <div className="ImageShow">
          <img src={this.props.image.image_url}/>
          <h3>{this.props.image.username} {this.props.image.image_blurb}</h3>

          <div className= "Like">
          <Like post={this.props.image} currentUser={this.props.currentUser}/>
          </div>

          <div className="Comments">
            <CommentIndex image={this.props.image} user={this.props.user}/>


            <button onClick={this.onModalClose} id="close">Close</button>
          </div>
        </div>


        </Modal>
      </div>
    );

  }
});

module.exports = ProfileSingleImage;
