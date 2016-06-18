var React = require('react');
var SessionStore = require('../stores/session');
var Link = require('react-router').Link;
var ErrorStore = require('../stores/errors');
var ErrorActions = require('../actions/error_actions');
var ImageApiUtil = require('../util/image_api_util');

var ImageForm = React.createClass({

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function(){
    return { blurb: "", photoUrl: null, photoFile: null, errors: "", load: null };
  },

  componentDidMount: function(){
    this.listener = ErrorStore.addListener(this.moreErrors);
  },

  moreErrors: function(){
    this.setState({errors: ErrorStore.formErrors("image")});
  },

  componentWillUnmount: function(){
    this.listener.remove();
  },

  blurbChange: function(event){
    var newBlurb = event.target.value;
    this.setState({ blurb: newBlurb });
  },

  updateFile: function(e){
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    }.bind(this);

    if(file){
      fileReader.readAsDataURL(file);
    }
  },


  imageErrors: function() {
    if (this.state.photoFile === null){
      this.setState({ errors: "No File Was Selected." });
    } else {
      this.setState({ errors: null });
    }
  },

  handleSubmit: function(click){
    click.preventDefault();
    this.imageErrors();
    var formData = new FormData ();
    formData.append("image[photo]", this.state.photoFile);
    formData.append("image[image_blurb]", this.state.blurb);
    formData.append("image[user_id]", SessionStore.currentUser().id);
    ImageApiUtil.createImagePost(formData, this.backToIndex);
    this.setState({ load: true });
  },

  backToIndex: function(){
    this.setState({ load: false });
    this.context.router.push("/");
  },

  render: function () {
    var loading;
    console.log(this.state.errors);
    if (this.state.load && this.state.errors === ""){
      loading = (
        <div className="loading">
          <img src={window.loading} />
        </div>
      );
    } else {
      loading = (
        <div>
          <img src={this.state.photoUrl} />
          <h3> Add Blurb </h3>
          <textarea rows="5" cols="40" onChange={this.blurbChange} value={this.state.blurb} placeholder="Write Your Blurb!"/>
        </div>
      );
    }

    return(
      <div className="form">
        <h1> Upload! </h1>
        <form onSubmit={this.handleSubmit}>

        <h2>{this.state.errors}</h2>

        {loading}

        <label class="custom-file-upload">
          <input type="file" onChange={this.updateFile}/>
          Choose File!
        </label>


        <input type="submit" value="Upload!" />
        </form>
        <Link to="/">←</Link>
      </div>
    );
  }
});

module.exports = ImageForm;
