class ChangeColName < ActiveRecord::Migration
  def change
    remove_column :notifications, :image_id
    add_column :notifications, :image_url, :string
  end
end
