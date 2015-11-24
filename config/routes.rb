Aggregator::Application.routes.draw do
  devise_for :users
  use_doorkeeper
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'home#index'

  get '/:id' => 'categories#show'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  namespace :api do
    namespace :v1 do
      resources :categories, only: [:show, :index, :create, :update, :destroy]

      resources :lines, only: [:show, :create, :update, :destroy] do
        post :insert_at, on: :member
      end

      resources :publications, only: [:index, :show, :create, :update, :destroy] do
        post :insert_at, on: :member
      end

      #resources :publication_edit, only: [] do
      #  get 'listen', on: :member
      #end

      get '/publication_edit/listen' => 'publication_edit#listen', as: :socket

      resources :boxes, only: [:show, :update, :destroy]
      resources :images, only: [:show, :create]

      resources :sources, only: [:index, :show, :create, :update, :destroy] do
        get :find_by_link, on: :collection
      end
    end
  end


  namespace :admin do
    get '*tail' => "home#index"
    get '/' => "home#index"
  end
end
