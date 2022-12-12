class Api::VideosController < ApplicationController
    before_action :require_logged_in, only: [:index]

    def index 
        @videos = Video.all
        if @videos
            render :index
        else
            render json: { videos: nil }
        end
    end

    def show
        @video = Video.find_by(id: params[:id])
        if @video
            render :show
        else
            render json: { video: nil }
        end
    end
end