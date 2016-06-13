class ChangeColumn < ActiveRecord::Migration
  def change
    remove_column :notifications, :type
    add_column :notifications, :notif_type, :string, null: false
  end
end
