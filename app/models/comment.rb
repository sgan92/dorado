class Comment < ActiveRecord::Base
  validates :body, :user_id, :image_id, presence: true

  belongs_to(
    :image,
    class_name: "Image",
    foreign_key: :image_id,
    primary_key: :id
  )


  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

end
