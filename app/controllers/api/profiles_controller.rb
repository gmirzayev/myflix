class Api::ProfilesController < ApplicationController
    before_action :require_logged_in, only: [:index, :create, :update, :destroy]

    def index 
        user = current_user
        @profiles = user.profiles
        if @profiles
            render :index
        else
            render json: { profiles: nil }
        end
    end

    def show
        @profile = Profile.find_by(id: params[:id])
        if @profile
            render :show
        else
            render json: { profile: nil }
        end
    end

    def create
        @profile = Profile.new(profile_params)
        @profile.user_id = current_user.id

        if @profile.save
            render :show
        else
            render json: @profile.errors.full_messages, status: 422
        end
    end

    def update 
        @profile = Profile.find_by(id: params[:id])
        if @profile.update(profile_params)
            render :show
          else
            render json: @profile.errors.full_messages, status: 422
          end
    end

    def destroy
        profileId = params[:id]
        profile = Profile.find_by(id: profileId)
        debugger
        if profile
            profile.destroy
        end
        # head :no_content # populate http response with no content => no body
    end

    private

    def profile_params
        params.require(:profile).permit(:name, :picture)
    end
end
