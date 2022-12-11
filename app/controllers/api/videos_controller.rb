class Api::VideosController < ApplicationController
    before_action :require_logged_in, only: [:index, :show]

    def index 
        @videos = Video.all
        if @videos
            render :index
        else
            render json: { videos: nil }
        end
    end

    def show

    end
end