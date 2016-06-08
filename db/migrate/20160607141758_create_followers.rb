class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :followers do |t|
      t.integer :followee_id, presence: true
      t.integer :follower_id, presence: true
    end
    add_index :followers, :followee_id
    add_index :followers, :follower_id
  end
end
