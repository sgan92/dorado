class Api::LikesController < ApplicationController

  def create

    @like = Like.new(like_params)
    @like.user_id = current_user.id

    if @like.save
      render 'api/like/show'
    end

  end

  def destroy
    @like = Like.find_by(
      user_id: current_user.id,
      image_id: like_params[:image_id]
    )
    @like.destroy
    render 'api/like/show'
  end


  private

  def like_params
    params.require(:like).permit(:image_id)
  end

end
