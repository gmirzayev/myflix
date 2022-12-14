class Api::LikesController < ApplicationController
    before_action :require_logged_in, only: [:index, :create, :destroy]
    wrap_parameters include: Like.attribute_names + ['profile_id'] + ['content_id']

    def index 
        @profile = Profile.find_by(id: params[:profile_id])
        @likes = @profile.likes
        if @likes
            render :index
        else
            render json: { likes: nil }
        end
    end

    def create
        @like = Like.new(like_params)
        if @like.save
          render :show
        else
          render json: @like.errors.full_messages
        end
    end
    
    def destroy
        @like = Like.find_by(id: params[:id])
        if @like
            @like.destroy
        else
            render json: @like.errors.full_messages
        end
    end
    
    def like_params
        params.require(:like).permit(:profile_id, :content_id)
    end
end