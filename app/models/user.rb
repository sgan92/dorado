class User < ActiveRecord::Base
  validates :username, :password_digest, :session_token, :first_name, :last_name, presence: true
  validates :username, :session_token, uniqueness: true

  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, length: { in: 3..15 }

  has_attached_file :photo, default_url: "", styles: { avatar: "175x175#"}
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\Z/

  after_initialize :ensure_session_token

  attr_reader :password

  has_many(
    :images,
    dependent: :destroy,
    class_name: "Image",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :comments,
    dependent: :destroy,
    class_name: "Comment",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :likes,
    dependent: :destroy,
    class_name: "Like",
    foreign_key: :user_id,
    primary_key: :id
  )

  has_many(
    :follows,
    dependent: :destroy,
    class_name: "Follow",
    foreign_key: :followee_id,
    primary_key: :id
  )

  has_many(
    :followings,
    dependent: :destroy,
    class_name: "Follow",
    foreign_key: :follower_id
  )

  has_many :followers, through: :follows, source: :follower

  has_many :followed_users, through: :followings, source: :followee

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    if user && user.is_password?(password)
      return user;
    end
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
