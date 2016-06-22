<h1>Dorado</h1>

<h2>Heroku</h2>

[dorado](http://dorado.space/)

Dorado is a full-stack web application that was modeled after [Instagram](https://www.instagram.com/?hl=en). It utilizes PostgreSQL, Ruby on Rails, React.js, and Flux. By using ajax requests, dorado is a single page app with all content delivered on a static page.

<h3> Features </h3>

![alt text](http://i.imgur.com/HNZxYkp.jpg)

For convenience, a user can sign into Dorado via Twitter. By using OmniAuth, the user's twitter UID can be used to skip the entire registration process.

![alt text](http://i.imgur.com/rFl414k.png)

Dorado's main feature is uploading an image. This image is stored in a table, with whatever comment the poster wishes to make, as well as the time it was created so that a time stamp can be rendered.

These images are uploaded via paperclip and hosted on amazon web services. During upload, three different versions of the image is uploaded at different sizes, so that when rendering, the optimal size can be chosen.

These images can then be commented/liked. To keep the dashboard at a manageable size, if the number of comments exceed 3, the user can toggle to see all comments, or only the most recent 3. If another user comments on an image/likes the image, a notification will pop up that shows the image the comment was left on as well as a link to the user who left the comment. (Unless that user is yourself.) This is done through a notifications table, which deletes the notification as soon as the user clicks on the notification. The notification will bring the user to the user who commented/liked the image.

![alt text](http://i.imgur.com/VbxsfCg.png)

When a user first signs in, a 'discover' function is available, as well as a search bar that will look through the database for usernames that may match what the user is looking for.

This function has been optimized such that only a maximum of five random users will be returned. These five users are then checked against the users the current user is already following.

`users = User.limit(5).order("RANDOM()")` is used such that the Users are ordered randomly, and the first five are returned.

Following users from the discover panel will automatically update the user's dashboard. The follow button on discover then also becomes disabled. To unfollow would require going to that user's profile page. The dashboard utilizes the gem kaminari to paginate. When the scrollbar hits the bottom of the screen, more images will be fetched from the database to prevent lagging.

<h3>Future Directions</h3>
- [ ] Direct Messaging : Further the social aspects of Dorado
- [ ] Tags : Like instagram, a hash tagging system
- [ ] Optimize Search : as of now, the search works fine because of the small database. However, in the future, a better algorithm will have to be utilized in order to make it realistic. Right now, only users who have posted at least one image can be found using the search function.
