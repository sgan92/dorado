json.array! @comments do |comment|
  json.extract! comment, :image, :user, :user_id, :image_id, :body, :id
end
