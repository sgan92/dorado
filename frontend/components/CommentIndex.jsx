var React = require('react');
var CommentApiUtil = require('../util/comment_api_util');
var CommentStore = require('../stores/comments');
var ImageStore = require('../stores/images');
var CommentForm = require('./CommentForm');
var CommentIndexItem = require('./CommentIndexItem');

var commentloadcounter = 0;

var CommentIndex = React.createClass({


  getInitialState:function(){
    return {
      comments: CommentStore.all(this.props.image.id),
      load: false
    };
  },

  componentDidMount: function(){
    if (commentloadcounter === 0){
      CommentApiUtil.fetchComments(this.props.image.id);
    }
    this.listener = CommentStore.addListener(this.commentChange);
    this.imageListener = ImageStore.addListener(this.commentChange);
  },

  commentChange: function(){
    this.setState({ comments:  CommentStore.all(this.props.image.id)});
  },

  componentWillUnmount: function(){
    commentloadcounter ++;
    this.listener.remove();
  },

  load: function(e){
    e.preventDefault();
    if (this.state.load){
      this.setState({load: false});
    } else {
      this.setState({load: true});
    }
  },

  render: function(){
    var load;

    if (this.state.comments.length >3 && !this.state.load){
      var comments = this.state.comments.slice(this.state.comments.length - 3).map( function(comment){
        return(
          <li key={comment.id}>
          <CommentIndexItem comment={comment}  />
          </li>
        );
      });
      load = <button onClick={this.load}>All Comments </button>;
    } else {
      var comments = this.state.comments.map( function(comment){
        return( <li key={comment.id}><CommentIndexItem comment={comment}  /></li>);
      });
      if (this.state.comments.length > 3){
        load = <button onClick={this.load}>Less Comments</button>;
      }
    }

    return(
      <div className="comments">
        <div id="all_comments">
          <ul>
            {comments}
          </ul>
        </div>

        {load}

        <CommentForm image={this.props.image}/>
      </div>
    );
  }
});

module.exports = CommentIndex;
