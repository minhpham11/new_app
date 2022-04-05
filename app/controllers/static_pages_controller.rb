class StaticPagesController < ApplicationController
  before_action :load_micropost, only: [:show, :edit, :update, :destroy]

  def home
    if logged_in?
      @micropost = current_user.microposts.build
      @feed_items = current_user.feed.paginate(page: params[:page])      
    end
  end

  def show
    # @comments = Comment.includes(:user).where(micropost_id: @micropost.id).newest.paginate(page: params[:page])
  end

  def help
  end
  
  def about
  end

  def contact
  end

  private

  def load_micropost
    @micropost = Micropost.find_by(id: params[:id])
    return if @micropost
    flash[:danger] = "Micropost not found!"
    redirect_to root_path
  end
  
end
