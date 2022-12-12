class Api::ContentsController < ApplicationController
    before_action :require_logged_in, only: [:index]

    def index 
        @contents = Content.all
        if @contents
            render :index
        else
            render json: { contents: nil }
        end
    end
end