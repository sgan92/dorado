class DeleteImageUrl < ActiveRecord::Migration
  def change
    remove_column :images, :image_url
  end
end
