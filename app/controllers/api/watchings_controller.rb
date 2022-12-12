class Api::WatchingsController < ApplicationController
    before_action :require_logged_in, only: [:index, :create, :destroy]

    def index 
        @profile = Profile.find_by(id: params[:profile_id])
        @watchings = @profile.watchings
        if @watchings
            render :index
        else
            render json: { watchings: nil }
        end
    end

    def create
        @watching = Watching.new(watching_params)
        if @watching.save
          render :show
        else
          render json: @watching.errors.full_messages
        end
    end
    
    def destroy
        @watching = Watching.find_by(id: params[:id])
        if @watching
            @watching.destroy
        else
            render json: @watching.errors.full_messages
        end
    end
    
    def watching_params
        params.require(:watching).permit(:profile_id, :video_id, :current_time)
    end
end