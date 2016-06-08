class RenameFollowers < ActiveRecord::Migration
  def change
    rename_table("followers", "follows")
  end
end
