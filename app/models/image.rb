class Image < ActiveRecord::Base
  validates :user_id, :photo, presence: true

  has_attached_file :photo, styles: {
    preview: "100x100#",
    post: "500x500#",
    profile: "250x250#"
  }
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

  belongs_to(
    :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :comments,
    dependent: :destroy,
    class_name: "Comment",
    foreign_key: :image_id,
    primary_key: :id
  )

  has_many(
    :likes,
    dependent: :destroy,
    class_name: "Like",
    foreign_key: :image_id,
    primary_key: :id
  )


end
