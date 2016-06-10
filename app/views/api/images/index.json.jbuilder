json.array! @images do |image|

  json.image_url image.photo.url(:post)
  json.image_blurb image.image_blurb
  json.user image.user
  json.id image.id
  json.comments image.comments
  json.created_at time_ago_in_words(image.created_at)
  json.user_id image.user_id
  json.width image.width
  json.likes image.likes

  json.set! :users_likes do
      image.likes.each do |like|
       json.set! like.user_id, true
     end
  end

  json.set! :likeusers do
      image.likes.each do |like|
       json.set! like.user.username, true
     end
  end

end
