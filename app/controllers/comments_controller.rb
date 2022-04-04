class CommentsController < ApplicationController
  before_action :load_micropost, only: [:edit, :update, :destroy]

  def new
    @micropost = Comment.find_by(id: params[:parent_id]).micropost
    @comment = @micropost.comments.new(parent_id: params[:parent_id])
  end


  def create
    @comment = current_user.comments.build(comment_params)
    @comment .micropost_id = @micropost_id
    if @comment.save
      flash[:success] = "Comment created!"
      redirect_to show_path(id: @comment.micropost_id)
    else
      flash[:danger] = "Comment not created!"
      redirect_to static_pages_path params[:micropost_id]
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :parent_id)
  end

  def load_micropost
    @micropost = Micropost.find_by(id: params[:comment][:micropost_id])
    return if @micropost
    flash[:danger] = "Comment not found!"
    redirect_to root_path
  end
end