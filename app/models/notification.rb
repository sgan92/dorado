class Notification < ActiveRecord::Base

  validates :notif_type, presence: true

  belongs_to(
    :notifier,
    class_name: "User",
    foreign_key: :notifier_id,
    primary_key: :id
  )

  belongs_to(
    :notifiee,
    class_name: "User",
    foreign_key: :notifiee_id,
    primary_key: :id
  )


end
