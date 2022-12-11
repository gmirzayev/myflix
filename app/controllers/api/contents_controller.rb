class Api::ContentsController < ApplicationController
    before_action :require_logged_in, only: [:index, :show]

    def index 
        # user = current_user
        # @profiles = user.profiles
        # if @profiles
        #     render :index
        # else
        #     render json: { profiles: nil }
        # end
    end

    def show

    end
end