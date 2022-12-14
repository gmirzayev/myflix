class Api::SavesController < ApplicationController
    before_action :require_logged_in, only: [:index, :create, :destroy]
    wrap_parameters include: Save.attribute_names + ['profile_id'] + ['content_id']

    def index 
        @profile = Profile.find_by(id: params[:profile_id])
        @saves = @profile.saves
        if @saves
            render :index
        else
            render json: { saves: nil }
        end
    end

    def create
        @save = Save.new(save_params)
        if @save.save
          render :show
        else
          render json: @save.errors.full_messages
        end
    end
    
    def destroy
        @save = Save.find_by(id: params[:id])
        if @save
            @save.destroy
        else
            render json: @save.errors.full_messages
        end
    end
    
    def save_params
        params.require(:save).permit(:profile_id, :content_id)
    end
end