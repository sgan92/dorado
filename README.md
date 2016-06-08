<h1>Instagram Proposal</h1>

<h2>Heroku</h2>

[dorado](http://instainstaclone.herokuapp.com/)

<h2>Minimum Viable Product</h2>
My clone by the end of two weeks, will satisfy the following:
- [x] create new users, sign in / sign out, guest demo log in
    + with adequate auth
- [x] able to post an image associated with that particular user
    + the image has likes, which can be toggled
- [x] user can toggle follow / unfollow
    + updates the user.followers, user.following
- [x] able to comment on images
- [ ] have infinite scroll / load more images with ajax
- [x] users have their own show page
    + includes a profile blurb
    + includes an icon
- [ ] style the site with css
- [ ] upload site online with minimal bugs

<h2>General Website Layout</h2>
 for a minimum viable product

 + **FONT** : Montserrat
 + **COLORS** :
  - #f1efe7
  - #e7f0f8
  - #c9b8ac
  - #a6a2a8
  - #7c6d6b

<h3> Sign Up Page </h3>
![alt text](http://i.imgur.com/o4wXrx7.png)

<h3> Sign Up Page </h3>
![alt text](http://i.imgur.com/xs1Vyyf.png)

<h2> Component Framework </h2>
The component hierarchy will be set up like so:
- App
  + Nav Bar (IndexPage)
  + Image Index
    - Image Index Item Header
    - Image Index Item Image
    - Image Index Item Likes
    - Image Index Item Blurb
    - Image Index Item Comment
    + Toggle Like
    + Comment
  + Profile

<h3> Main Page </h3>
![alt text](http://i.imgur.com/vWMIo2D.png)

<h3> Profile Page </h3>
![alt text](http://i.imgur.com/DTRj2yY.png)

<h2> Flux Cycles </h2>
organized by data type.
  - Where action is invoked
  - Which store the action is involved in
  - Components that will update

<h3> User Action Cycles </h3>
- `login`
  + invoked from `onClick` of sign in submit form
  + go to **User Actions** > User Api Util
  + **POST /api/session** ajax request
    - server sends back the User
    - success callback goes to `UserActions.loginUser`
      + Dispatch to User Store, sends in a user
  + `_currentUser` is set to the user passed down
- `logout`
  + invoked from `onClick` of sign out in **nav bar component**
  + **User Actions** > User Api Util
  + **DESTROY /api/session** ajax request
    - server sends back the User
    - success callback goes to `UserActions.logOut`
      + Dispatch to User Store, sets `_currentUser` to null
- `signup`
  + invoked from `onClick` of sign up submit form
  + go to **User Actions** > User Api Util
  + **POST /api/user** ajax request
    - server sends back the User
    - success callback to `UserActions.loginUser`
    - **SEE ABOVE LOG IN**


<h3> Image Action Cycles </h3>
- `fetchAllImages`
  + invoked from the **component Image Index**
    - `componentDidMount`
      + add a listener to Image Store on change of all images
      + Client Actions calls fetch All Images
  + Client Actions > Api Actions
    - Api Actions fetches all images from database using ajax
      +  **GET /api/images**
  + Api Action > Server Action
- `receiveAllImages`
    - **Server Action receives ALL IMAGES** (passed into server action)
  + Server Action > Image Store
    - `ImageStore.__onDispatch` calls `ImageStore.__emitChange` on `receiveAllImages`, resets `_images`
- `createImagePost`
  + invoked from **ADD PIC link**
    - `onClick` action
  + Client Action is called
    - client action > api/util
    - api/util makes ajax request to server to create image post
      + **POST /api/images**
      + ajax request sends to the server the image
      + success callback, receives image post back
- `receiveImagePost`
    - Server Action > Image Store
      - `ImageStore.__onDispatch` calls `ImageStore.__emitChange` on `receiveImagePost`, resets `_images` by updating it with `_images[id]`
- `destroyImagePost`
  + invoked from a delete button
    - `onClick`
  + Client Action is called
    - Client Actions > Api Actions
    - Api/Util makes an ajax request for that specific image
    - **DELETE /api/images/:id**
    - Success callback > Server Action to fetch specific image
      - Server Action receives a singular image
- `removeImage`
    - Server Action > Image Store
      - `ImageStore.__onDispatch` calls on `ImageStore.__emitChange` on r`removeImage`, resets `_images` by deleting `_images[id]`

<h3> Comment Action Cycles </h3>
- `fetchAllComments`
  + invoked from the **component Image Index Item Comment**
    - `componentDidMount`
      + add a listener to Comment Store on change of all comments
      + Comment Actions call fetch All Comments
  + Comment Actions > Comment Api Actions
    + **GET /api/images/id/comments**
    - Api Actions fetches all comments on that particular image using ajax
  + Api Action uses callback that is passed in from Comment Actions
- `receiveAllComments`
  + Comment Actions receives the comments > `CommentStore`
    - `CommentStore.__onDispatch` calls on the function, then `.__emitChange`, resetting `_comments`
-  `createComment`
  + invoked from **image index item comment component**
    - event listener
      + `if (event.keyCode == 13)`
      + Comment Actions call fetch Comment
  + Comment Actions > Comment Api Actions
    + **POST /api/images/id/comments**
    - Api Action fetches a comment using ajax
-  `receiveComment`
    - success callback calls on Comment Actions, which receives the comment
    - `CommentStore` calls on the function ( `receiveComment` ), calls `.__emitChange` after adding  `_comments[id]` to `_comments`
- `destroyComment`
  + invoked on delete button
    - `onClick`
    - Comment Actions > Comment Api Actions
    + **DESTROY /api/images/id/comments/id**
    - Api fetches specific comment using ajax, uses callback passed in from Comment Actions
    - Success Callback > Comment Action takes the specific image, deletes it
- `removeComment`
  + Comment Action > Comment Store
    - `.__emitChange` is invoked in `removeComment` by deleting (`_comments[id]`) from `_comments`

<h3> Likes Action Cycles </h3>
Although this has its own separate header, it goes in Image Index Item component.
- `_Liked`
  + checks if currentUser (state of the **component Image Index Item**) likes the image
  + goes to `toggleLike`
- `toggleLike` goes to either `LikeActions.createLike` OR `LikeActions.deleteLike` depending on like status
- Like Actions > Like Api Util
  * **POST/DELETE api/likes**
  + pass in the image_id to Api Util so ajax request can be made
  + sending data in (the image_id)
  + success callback (in Like Actions)
    - sends back the current user id
  + **Image Store**
    - `ImageStore.addLike` OR `ImageStore.removeLike` is called
    - either delete (splice) or add (push) the user_id to the image's user_likes
      + use image associations (in rails)
    - `.__emitChange` is called, with `_images[id].user_likes` changing the state of `_images`

<h3> Follow Action Cycle</h3>
Goes in Profile Component
- `_Following`
  + checks if currentUser ( state of the **component Profile** ) is following the user on the profile page
  + goes to `toggleFollow`
- `toggleFollow` will either go `FollowActions.createFollow` or `FollowActions.deleteFollow`
- Follow Actions > Follow Api Util
  + **POST/DELETE api/follows**
  + pass in the user_id to Api Util, ajax request is made
  + success callback (in Follow Actions), sends back user_id
- **User Store**
  - `User.follow` or `User.unfollow` is called
  - either delete(splice) or add (push) the user_id to the current_user's followed_users
    + use user associations (rails)
  - `.__emitChange` is called, with `_currentUser.followed_users` changing the state of
  `_currentUser`


<h2> Routes </h2>
_HTML_
+ **GET** /
  + **GET** /users/new
    - to the sign up page
  + **POST** /users
    - submitting sign in
  + **GET** /session/new
    - log in page
  + **POST** /session
    - submitting log in
  + **DELETE** /session
    - log out
  + **GET** /user/id
    - user show page

_JSON_

+ /api/images
+ /api/images/:id
+ /api/comments/:id
  - need to delete a comment
+ /api/follows
+ /api/likes



<h2>Database Schema</h2>
Not including any bonuses
<h4>Users</h4>

| column name | data type | details |
|-------------|-----------|---------|
| id          | integer   | given   |
| username    | string    | not null, unique, index |
| password_digest | string | not null |
| session_token | string | not null, unique, index |
| first_name | string | not null |
| last_name | string | not null |
| profile_pic | string | OPTIONAL|
| profile_blurb |text | OPTIONAL|

<h4>Images</h4>

| column name | data type | details |
|-------------|-----------|---------|
| id          | integer   | given   |
| user_id     | integer   | reference to user, index, not null |
| image_url   | string    | not null |
| image_blurb  | text      | OPTIONAL |

<h4> Comments </h4>

| column name | data type | details |
|-------------|-----------|---------|
| id          | integer   | given   |
| image_id    | integer   | reference to image, index, not null|
| user_id     | integer   | reference to user, not null |
| body        | text      | not null |

<h4> Likes </h4>

| column name | data type | details |
|-------------|-----------|---------|
| id          | integer   | given   |
| image_id    | integer   | reference to image, index, not null |
| user_id     | integer   | reference to user, index, not null |

<h4> Followers </h4>

| column name | data type | details |
|-------------|-----------|---------|
| id          | integer   | given   |
| user_following_id | integer   | reference to user, index, not null |
| user_being_followed_id  | integer   | reference to user, index, not null |

<h2> Timeline </h2>
This timeline will not span the entirety of two weeks, in case something goes wrong and more time is required. Therefore, I left a few days of leeway.

<h3> Phase One: From the Bottom (1 Day)</h3>
**OBJECTIVE:** Sign up and Log in! (and log out)
  + Create the new Project
    - Postgres
    - Set up `User` model, migration, controller
    - Authentication, User Actions
      + User Api Util
  + Sign up/ Sign in pages (CSS)
  + Set up webpack.config.js, package files

<h3> Phase Two: Image Posts (1 Day)</h3>
**Objective:** A User can post an image that contains a blurb, can delete said image.
  + Create `Image` model, migration, controller
  + json.jBuilder /api/images views
  + set up `ImageIndexItem` Flux Cycle
    - components, actions, stores, etc
  + set up entry.jsx, React Routers

<h3> Phase Three: Image Posts CSS (1 Day)</h3>
**Objective:** Place elements in approximate positions
  + position the elements on the page
  + make the sign in/sign up page look nice(r)

<h3> Phase Four: Comments (1 Day)</h3>
**Objective:** Be able to comment on a image and delete it
  + Make Comment Flux Cycle
    - components, actions, stores, etc
  + Place comment divs in the right place

<h3> Phase Five: Back to Toggles (2 Days) </h3>
**Objective:** Be able to follow other users, like images
  + create `Follow` and `Like` models, migrations, controllers
  + Flux Cycles
    - components, actions, stores, etc.
  + Add to entry.jsx, React Router

<h3> Phase Six: Some more intermediate Styling (1 Day)</h3>
**Objective:** Make my website look better ....
  + Position the elements done in Phase 5
    - `Follow`
    - `Like`
  + Continue styling other parts of the website

<h3> Phase Catch Up (1 Day) </h3>
**Objective:** If I got caught up in an issue, catch up time is here!!
  + Finish anything I might be behind on

<h3> Phase Six: User Profile (1 Day) </h3>
**Objective:** The user show page shows the components
  + Make the profile components
    - `ProfileHeader`
    - `ProfileHeaderImage`
    - `ProfileImage`

<h3> Phase Seven: Seed and CSS (1 Day)</h3>
**Objective:** Time travel to 2016
  + Make the logo
  + CSS!!! everywhere!!
  + Add transitions and the like

<h3> Phase Eight: Refactor (0.5 Days) </h3>
**Objective:** Partials, helpers, refactor!
  + Make my code look presentable
  + Refactor HTML/CSS as well
  + Any touch up work

<h2> Bonus </h2>
- user search bar for users
- update user profile information
  + after signing up, you can "edit" your own blurb
- tags
  + tag.title, tag.image_id
  + search by tags
- notifications
- add filters
  + use css3
  + canvas
- "private" accounts/friends only
  + will have to add an option for the user to be able to make themselves private
- add location to photos
- be able to privately message other users
