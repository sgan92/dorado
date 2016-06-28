var React = require('react');
var CommentApiUtil = require('../util/comment_api_util');
var CommentStore = require('../stores/comments');
var CommentForm = require('./CommentForm');
var CommentIndexItem = require('./CommentIndexItem');

var CommentIndex = React.createClass({

  getInitialState:function(){
    return {
      comments: CommentStore.all(this.props.image.id),
      load: false,
    };
  },

  componentDidMount: function(){
    CommentApiUtil.fetchComments(this.props.image.id);
    this.listener = CommentStore.addListener(this.commentChange);

    this.pusher = new Pusher('bb66e1752e6b946ffd95', {
      encrypted: true
    });

    var channel = this.pusher.subscribe('comments_' + this.props.image.id);
    channel.bind('comment_published', function(data) {
      CommentApiUtil.fetchComments(this.props.image.id);
    }.bind(this));

  },

  commentChange: function(){
    this.setState({ comments:  CommentStore.all(this.props.image.id)});
  },

  componentWillUnmount: function(){
    this.listener.remove();
    this.pusher.unsubscribe('comments_' + this.props.image.id);
    this.pusher.disconnect();
  },

  load: function(e){
    e.preventDefault();
    if (this.state.load){
      this.setState({load: false, comments: CommentStore.all(this.props.image.id)});
    } else {
      this.setState({load: true, comments: CommentStore.all(this.props.image.id)});
    }
  },

  render: function(){

    var load;
    var comments;

    if (this.state.comments.length >3 && !this.state.load){
      comments = this.state.comments.slice(this.state.comments.length - 3).map( function(comment){
        load = <button onClick={this.load}>All Comments </button>;
        return(
          <li key={comment.id}>
          <CommentIndexItem comment={comment}  />
          </li>
        );
      }.bind(this));
    } else {
      comments = this.state.comments.map( function(comment){

        if (this.state.comments.length > 3){
          load = <button onClick={this.load}>Less Comments</button>;
        }

        return( <li key={comment.id}><CommentIndexItem comment={comment}  /></li>);

      }.bind(this));

    }

    return(
      <div className="comments">
        <div id="all_comments">
          <ul>
            {comments}
          </ul>
        </div>

        {load}

        <CommentForm image={this.props.image} user={this.props.user}/>
      </div>
    );
  }
});

module.exports = CommentIndex;
