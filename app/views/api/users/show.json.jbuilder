json.extract! @user,
  :id, :username, :first_name, :last_name,
  :profile_blurb


json.followings @user.followings do |following|
  json.followee following.followee_id
end

json.images @user.images.each do |image|
  json.image_url image.photo.url(:profile)
  json.id  image.id
end

json.profile_pic @user.photo.url(:avatar)

json.likes @user.likes do |like|
  json.image_id true
end

json.user_followers @user.followers.each do |follower|
  json.set! follower.username, true
end

json.followers @user.followers.length

json.num_followers @user.followings.length
