json.extract! @image, :photo, :image_blurb, :id, :user_id, :user

json.image_url @image.photo.url(:post)

json.set! :likes do
    @image.likes.each do |like|
     json.set! like.user_id, true
   end
end
