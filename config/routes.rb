Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :user, only: [:create, :update]
    resources :images, only: [:create, :show, :destroy, :index]
    resources :comments, only: [:create, :show, :destroy, :index]
    resource :like, only: [:create, :destroy]
    resource :session, only: [:create, :destroy, :show]
    resources :users, only: [:show]#, param: :username
    resource :follow, only: [:create, :destroy]
    resources :follows, only: [:index]
  end

end
