class CommentsController < ApplicationController
  before_action :load_micropost, only: [:edit, :update, :destroy]

  def new
    # @micropost = Comment.find_by(id: params[:parent_id]).micropost
    # @comment = @micropost.comments.new(parent_id: params[:parent_id])
  end


  def create
    @micropost = current_user.microposts.build
    comment = Comment.new(comment_params)
    if comment.save
      render json: { message: "Comment created successfully!", comment: comment }
      # flash[:success] = "Comment created!"
      # redirect_to show_path(id: @comment.micropost_id)
    else
      render json: unprossessable_entity, status: :unprocessable_entity
      # flash[:danger] = "Comment not created!"
      # redirect_to static_pages_path params[:micropost_id]
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:comment_content, :micropost_id :parent_id)
  end

  def load_micropost
    @micropost = Micropost.find_by(id: params[:comment][:micropost_id])
    return if @micropost
    flash[:danger] = "Comment not found!"
    redirect_to root_path
  end
end