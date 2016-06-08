class Api::CommentsController < ApplicationController

  def index
    @comments = Comment.where(image_id: comment_params[:image_id])
  end

  def create
    @comment = Comment.new(comment_params)
    @comment[:user_id] = current_user.id

    if @comment.save
      render 'api/comments/show'
    else
      render(
        json: {
          comment: ["Please type a comment."]
        },
        status: 400
      )
    end

  end

  def show
    @comment = Comment.find(params[:id])
  end


  private

  def comment_params
    params.require(:comment).permit(:image_id, :body);
  end



end
