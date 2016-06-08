class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :image_id, null: false
      t.integer :user_id, null: false
    end
    add_index :likes, :image_id
    add_index :likes, :user_id
  end
end
