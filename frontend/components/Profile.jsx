var React = require('react');
var ImageApiUtil = require('../util/image_api_util');
var ImageStore = require('../stores/images');
var SessionApiUtil = require('../util/session_api_util');
var UserApiUtil = require('../util/user_api_util');
var FollowApiUtil = require('../util/follow_api_util');
var SessionStore = require('../stores/session');
var ModalStyle = require('./ModalStyle');
var ProfileImageIndex = require('./ProfileImageIndex');

var Modal = require("react-modal");

var Profile = React.createClass({

  getInitialState: function(){
    SessionApiUtil.fetchCurrentUser();
    return {
      images: [],
      user: "",
      modalOpen: false,
      photoUrl: "",
      photoFile: "",
      blurb: "",
      button: null,
      follows: null,
      loading: null
    };
  },

  componentDidMount: function(){
    this.username = this.props.params.username;

    ImageApiUtil.fetchByUser(this.username);

    this.imageListener = ImageStore.addListener(this.profile);
    this.userListener = ImageStore.addListener(this.setUser);
    this.editListener = SessionStore.addListener(this.editProfile);
  },

  componentWillReceiveProps: function(newProps){
    ImageApiUtil.fetchByUser(newProps.params.username);
  },

  profile: function(){
    this.setState({ images: ImageStore.profileImages() });
  },

  setUser: function(){
    this.setState({ user: ImageStore.user() });
    this.setState({ follows: this.state.user.followers });

    if (this.state.user.user_followers){

      var followerObj = {};
      this.state.user.user_followers.map( function(obj){
        followerObj[Object.keys(obj)[0]] = true;
      });

      this.setState({ button: followerObj.hasOwnProperty(this.currentUser.username) });
    }

  },

  editProfile: function(){
    this.currentUser = SessionStore.currentUser();
    this.setState({ imageURL: this.currentUser.profile_pic});
    this.setState({ blurb: this.currentUser.profile_blurb});
  },

  componentWillUnmount: function(){
    this.userListener.remove();
    this.imageListener.remove();
    this.editListener.remove();
  },

  handleButton: function(e){

    if (this.button === "Edit Profile") {
      this.setState({ modalOpen: true });
    } else if (this.button === "Follow") {
      FollowApiUtil.follow(this.state.user.id);
      this.setState({ follows: this.state.follows + 1 });
      this.setState({ button: true });
    } else if (this.button === "Unfollow") {
      FollowApiUtil.unfollow(this.state.user.id);
      this.setState({ follows: this.state.follows - 1 });
      this.setState({ button: false });
    }
  },

  blurbChange: function(e){
    newBlurb = e.target.value;
    this.setState({ blurb: newBlurb });
  },

  picChange: function(e){
    var file = e.currentTarget.files[0];
    var fileReader = new FileReader();
    fileReader.onloadend = function () {
      this.setState({ photoFile: file, photoUrl: fileReader.result });
    }.bind(this);

    if(file){
      fileReader.readAsDataURL(file);
    }
  },

  isCurrentUser: function(){
    if (SessionStore.currentUser().id === this.state.user.id){
      return true;
    }
    return false;
  },

  onModalClose: function(){
    this.setState({ loading: false });
    this.setState({ modalOpen: false });
    ModalStyle.content.opacity = 0;
  },

  onModalOpen: function(){
    ModalStyle.content.opacity = 1;
  },

  handleEdit: function(e){
    e.preventDefault();
    var formData = new FormData();
    formData.append("user[profile_blurb]", this.state.blurb);
    formData.append("user[photo]", this.state.photoFile);
    UserApiUtil.updateUser(formData, this.onModalClose);
    this.setState({ loading: true });
  },

  render: function(){

    var info = "";
    var images;
    var numPosts = 0;
    var profileImg = "";
    var grammar;
    var button;
    var blurb;
    var followers;
    var loading;

    if (this.state.user){

      if (this.state.user.images){

        images = <ProfileImageIndex images = {this.state.images} username={this.state.user.username} />;


        numPosts = this.state.user.images.length;

        if (numPosts === 1){
          grammar = "post";
        } else {
          grammar = "posts";
        }
      }


      if (this.state.user.id === this.currentUser.id && this.state.photoUrl !== null && this.state.photoUrl !== "") {
        profileImg = this.currentUser.profile_pic;
      } else if ( this.state.user.profile_pic !== null && this.state.user.profile_pic !== "" ){
        profileImg = this.state.user.profile_pic;
      } else {
        profileImg = window.profilePic;
      }


      if (this.state.user.id === this.currentUser.id && this.state.blurb !== "") {
        blurb = this.state.blurb;
      } else if ( this.state.user.blurb !== "about user here" ){
        blurb = this.state.user.profile_blurb;
      }

      if (this.isCurrentUser()){
        this.button = "Edit Profile" ;
      } else if (this.state.button) {
        this.button = "Unfollow";
      } else {
        this.button = "Follow";
      }

      if (this.state.follows === 1){
        followers = "follower";
      } else {
        followers = "followers";
      }

      if (!this.state.loading){
        loading = (
          <div className="editProfile">
            <h2> Edit Profile </h2>
            <form onSubmit={this.handleEdit}>

              <input type="text"
                onChange={this.blurbChange}
                placeholder="Edit User Blurb"
                />

                <label>
                  <input type="file" onChange={this.picChange} />
                  Choose File
                </label>

              <input type="submit" value="Update" />

            </form>

            <button onClick={this.onModalClose}>Close</button>
          </div>
        );
      } else {
        loading = (
          <div className="loading">
            <img src={window.loading} />
          </div>
        );

      }


      info = (
        <div className="profileInfo">
           <h1>{this.state.user.username}</h1>
           <h2>{this.state.user.first_name}</h2>
           <h2>{this.state.user.last_name}</h2>
           <p>{blurb}</p>
           <h3>{numPosts} {grammar} </h3> <h3> {this.state.follows} {followers}</h3> <h3> {this.state.user.num_followers} following </h3>

           <button onClick={this.handleButton} > {this.button} </button>
         </div>
      );
    }

    return (
      <div className="background">
        <div className="userImages">
          <div className="profile">
            <img src={profileImg}/>
          </div>

          {info}

          {images}

        </div>

          <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.onModalClose}
          style={ModalStyle}
          onAfterOpen={this.onModalOpen}>

            {loading}

          </Modal>

      </div>
    );
  }

});

module.exports = Profile;
