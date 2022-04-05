class CommentsController < ApplicationController
  before_action :load_micropost, only: [:edit, :update, :destroy]

  def new
    @micropost = Comment.find_by(id: params[:parent_id]).micropost
    @comment = @micropost.comments.new(parent_id: params[:parent_id])
  end


  def create
    # @comment = current_user.comments.build(comment_params)
    @micropost = current_user.micropost.build
    
    # @comment .micropost_id = @micropost_id
    comment = Comment.new(comment_params)

    if comment.save
      render json: { message: "comment created", comment: comment }    
    else
      render json: unprossessable_entity, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:comment_content, :parent_id, :parent_id)
  end

end