class Api::UsersController < ApplicationController

  def discover

    user_ids = []

    users = User.joins(:images).group("id").limit(5).order("RANDOM()")

    followings = {}
    followings[current_user.id] = true

    current_user.followings.each do |following|
      followings[following.followee_id] = true
    end

    users.each do |user|
      if !followings.key?(user.id)
        user_ids.push(user.id)
      end
    end

    @users = User.where(id: user_ids)
    render "api/users/index"

  end

  def search
    if params[:search].present?
      @users =
      User.where("LOWER(username) ~ LOWER(?)", params[:search]).limit(5)
    else
      @users = User.none
    end

    render "api/users/index"

  end

  def show
    @user = User.find_by_username(params[:username])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      render 'api/users/show'
    else
      render json: {
        user: @user.errors.full_messages
        }, status: 422
    end
  end

  def update
    params[:user][:id] = current_user.id
    @user = User.find(params[:user][:id])
    if @user.update_attributes!(user_params)
      render 'api/users/show'
    end
  end

  private

  def user_params
    params.require(:user).permit(
    :username,
    :password,
    :first_name,
    :last_name,
    :profile_blurb,
    :photo,
    :photo_content_type,
    :photo_file_size,
    :photo_updated_at
    )
  end

end
