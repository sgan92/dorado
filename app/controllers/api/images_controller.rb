class Api::ImagesController < ApplicationController

  def index

    following = []
    if (current_user.images)
      following << current_user.id
    end
    current_user.followings.map do |followee|
      following << followee.followee_id
    end

    page = params[:page].to_i

    @images = Image.where(user_id: following).reverse_order.page(1).per(3*page)

  end

  def show
    @image = Image.find(params[:id])
  end

  def create
    @image = Image.new(image_params)
    if @image.save
      render 'api/images/show'
    else
      render(
        json: {
          image: ["Image Upload Error!"]
        },
        status: 415
      )
    end
  end

  def destroy
    @image = Image.find(params[:id])
    @image.destroy
    render 'api/images/show'
  end

  private

  def image_params
    params.require(:image).permit(:image_blurb, :user_id, :photo)
  end

end
