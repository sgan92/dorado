class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :profile_pic
      t.text :profile_blurb
    end
    add_index :users, :username, unique: true
    add_index :users, :session_token, unique: true
  end
end
