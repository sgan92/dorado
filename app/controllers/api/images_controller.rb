class Api::ImagesController < ApplicationController

  def index

    following = []
    if (current_user.images)
      following << current_user.id
    end
    current_user.followings.map do |followee|
      following << followee.followee_id
    end

    page = params[:page]

    if page == "1"
      return @images = Image.where( user_id: following ).page(page).per(10)
    else
      arr = []
      page = page.to_i
      (1..page).each do |page|
        arr << Image.where( user_id: following ).page(page).per(10)
      end
      @images = arr.flatten
      return @images
    end

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
