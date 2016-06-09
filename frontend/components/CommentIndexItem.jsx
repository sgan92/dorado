var React = require('react');
var Link = require('react-router').Link;

var CommentIndexItem = React.createClass({
  render: function(){

    var userLink = "/" + this.props.comment.user.username;

    return(
      <div id="comment" >
        <Link to= {userLink}>
          {this.props.comment.user.username}:
        </Link>
        {this.props.comment.body}
      </div>
    );
  }
});

module.exports = CommentIndexItem;
