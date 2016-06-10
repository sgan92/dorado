<h1>Dorado</h1>

<h2>Heroku</h2>

[dorado](http://instainstaclone.herokuapp.com/)

Dorado is a full-stack web application that was modeled after [Instagram](https://www.instagram.com/?hl=en). It utilizes PostgreSQL, Ruby on Rails, React.js, and Flux. By using ajax requests, dorado is a single page app with all content delivered on a static page.

<h3> Features </h3>
![alt text](http://i.imgur.com/svcrhKu.png)

Dorado's main feature is uploading an image. This image is stored as a table, with whatever comment the poster wishes to make, as well as the time it was created so that a time stamp can be rendered.

When a user first signs in, a 'discover' function is available, as well as a search bar that will look through the database for usernames that may match what the user is looking for.

This search has been optimized such that only a maximum of five random users will be returned. These five users are then checked against the users the current user is already following.

`users = User.limit(5).order("RANDOM()")` is used such that the Users are ordered randomly, and the first five are returned.

<h3>Future Directions</h3>
- [ ] Direct Messaging : Further the social aspects of Dorado
- [ ] Tags : Like instagram, a hash tagging system
- [ ] Optimize Search : as of now, the search works fine because of the small database. However, in the future, a better algorithm will have to be utilized in order to make it realistic.
