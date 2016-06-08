class Lose < ActiveRecord::Migration
  def change
    change_column :images, :photo_file_name, :string, :null => true
  end
end
