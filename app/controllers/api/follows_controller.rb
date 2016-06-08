class Api::FollowsController < ApplicationController

  def index
    @follows = Follow.where(follower_id: follow_params[:followee_id])
  end

  def create
    @follow = Follow.new(follow_params)
    @follow[:follower_id] = current_user.id

    if @follow.save
      render 'api/follow/show'
    end

  end

  def destroy
    @follow = Follow.where(
      {followee_id: follow_params[:followee_id],
      follower_id: current_user.id}
    ).first

    @follow.destroy
    render 'api/follow/show'
  end

  private

  def follow_params
    params.require(:follow).permit(:followee_id)
  end

end
