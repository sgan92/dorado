class ChangeBlurbDefault < ActiveRecord::Migration
  def change
    change_column_default(:users, :profile_blurb, "about user here")
  end
end
