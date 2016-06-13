var React = require('react');
var CommentApiUtil = require('../util/comment_api_util');
var SessionStore = require('../stores/session');
var NotificationApiUtil = require('../util/notification_api_util');

var CommentForm = React.createClass({

  getInitialState: function(){
    return { body: "" };
  },

  bodyChange: function(e){
    var newBody = e.target.value;
    this.setState({ body: newBody });
  },

  handleSubmit: function(e){
    e.preventDefault();

    CommentApiUtil.createComment({
      body: this.state.body,
      image_id: this.props.image.id
    }, this.addNotification);

    this.setState({ body: "" });
  },

  addNotification: function(){
    if (this.props.user.id !== SessionStore.currentUser().id) {
      NotificationApiUtil.addNotification({
        notification: {
          notif_type: "made a comment",
          image_url: this.props.image.image_url,
          notifiee_id: this.props.user.id
        }
      })
    }

  },

  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="commentform">
        <input type="text"
          onChange={this.bodyChange}
          value={this.state.body}
          placeholder="COMMENT"
        />
        <input type="submit" value="Comment" />
      </form>
    );
  }
});

module.exports = CommentForm;
