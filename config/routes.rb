Aggregator::Application.routes.draw do
  devise_for :users
  use_doorkeeper

  root 'home#index'

  match "/404", :to => "errors#error_404", :via => :all
  match "/422", :to => "errors#error_422", :via => :all
  match "/500", :to => "errors#error_500", :via => :all

  get '/guides' => 'home#guides'

  get '/about' => 'home#about'
  get '/contacts' => 'home#contacts'

  get '/:type/:year/:month/:day/:slug' => 'publications#show'
  get '/guides/:slug' => 'publications#show'
  get '/news/:slug' => 'publications#show'
  get '/articles/:slug' => 'publications#show'
  get '/videos/:slug' => 'publications#show'
  get '/publications/:slug' => 'publications#show'

  namespace :feeds do
    resources :publications, only: [:index]
    resources :news, only: [:index]
  end



  namespace :api do
    namespace :v1 do
      resources :search, only: [:index]

      resources :users, only: [:index, :show, :create, :update] do
        get 'me', on: :collection
      end

      resources :tweets, only: [:show]
      resources :categories, only: [:show, :index, :create, :update, :destroy]

      resources :lines, only: [:show, :create, :update, :destroy] do
        post :insert_at, on: :member
      end

      resources :urls, only: [:index, :show] do
        member do
          put :move_to_lame
          put :move_to_intresting
        end
      end

      resources :publications, only: [:index, :show, :create, :update, :destroy] do
        member do
          post :insert_at
          put :move_to_approved
          put :move_to_pending
        end
      end

      resources :publication_links, only: [:show, :index, :create, :update, :destroy]

      resources :boxes, only: [:show, :update, :destroy]
      resources :images, only: [:show, :create, :destroy]

      resources :sources, only: [:index, :show, :create, :update, :destroy] do
        get :find_by_link, on: :collection
      end
    end
  end



  namespace :redaction do
    get '*tail' => "home#index"
    get '/' => "home#index"
  end
end
