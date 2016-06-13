class Follow < ActiveRecord::Base
  
  validates :followee, :follower, presence: true
  validates :follower, uniqueness: { scope: :followee }

  belongs_to(
    :follower,
    class_name: "User",
    foreign_key: :follower_id,
    primary_key: :id
  )

  belongs_to(
    :followee,
    class_name: "User",
    foreign_key: :followee_id,
    primary_key: :id
  )


  def followee_followers
    follower_usernames = []
    self.followee.followers.each do |follower|
      follower_usernames << follower.username
    end
    follower_usernames
  end


end
