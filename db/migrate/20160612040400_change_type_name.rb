class ChangeTypeName < ActiveRecord::Migration
  def change
    remove_column :notifications, :type
    add_column :notifications, :type, :string, null: false
  end
end
