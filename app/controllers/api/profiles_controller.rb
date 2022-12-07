class Api::ProfilesController < ApplicationController
    # before_action :require_logged_in, only: [:index, :create, :show, :update, :destroy]

    def index 
        # user = User.first
        user = current_user
        @profiles = user.profiles
        if @profiles
            render :index
        else
            render json: { profiles: nil }
        end
    end

    # def show
    #     user = current_user
    #     @profile = user.profiles
    #     if @profile
    #         render 'api/profiles/show'
    #     else
    #         render json: { profiles: nil }
    #     end
    # end

    def create
        @profile = Profile.new(profile_params)
        @profile.user_id = current_user.id
        debugger

        if @profile.save
            render :show
        else
            render json: @profile.errors.full_messages, status: 422
        end
    end

    def update 
        
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
