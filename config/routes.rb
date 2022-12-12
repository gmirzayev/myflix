Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api, defaults: {format: :json} do
    # ...
    resources :users, only: [:show, :create, :update] do
      resources :profiles, only: [:index, :create]
    end

    resources :profiles, only: [:show, :update, :destroy] do
      resources :saves, only: [:index]
      resources :likes, only: [:index]
      resources :watchings, only: [:index]
    end

    resources :saves, only: [:create, :destroy]
    resources :likes, only: [:create, :destroy]
    resources :watchings, only: [:create, :destroy]

    resources :contents, only: [:index]
    resources :videos, only: [:index, :show]

    resource :session, only: [:create, :show, :destroy]

  end
  get '*path', to: "static_pages#frontend_index"
end
