class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|

      t.string :type, null: false
      t.integer :image_id
      t.integer :notifiee_id
      t.integer :notifier_id

    end

    add_index :notifications, :image_id
    add_index :notifications, :notifiee_id
    add_index :notifications, :notifier_id

  end
end
