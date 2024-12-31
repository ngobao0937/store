Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token
  resources :menus, only: [:index, :create, :new, :edit, :update]
  resources :pages, only: [:index, :create, :new, :edit, :update]
  resources :users, only: [:index, :create, :new, :edit, :update]
  resources :banners, only: [:index, :create, :new, :edit, :update]

  get "up" => "rails/health#show", as: :rails_health_check

  resources :products do
    resources :subscribers, only: [ :create ]
  end

  resource :unsubscribe, only: [ :show ]

  get 'admin', to: 'dashboard#index', as: 'dashboard'
  get 'session/logout', to: 'sessions#logout', as: 'session_logout'

  get 'product/:id/delete', to: 'products#delete', as: 'product_delete'
  get 'menu/:id/delete', to: 'menus#delete', as: 'menu_delete'
  get 'page/:id/delete', to: 'pages#delete', as: 'page_delete'
  get 'user/:id/delete', to: 'users#delete', as: 'user_delete'
  get 'banner/:id/delete', to: 'banners#delete', as: 'banner_delete'
  
  get '/', to: 'home#index', as: 'home_index'
  get '/product/:id/:slug', to: 'home#detail', as: 'product_detail'
  get '/products/:id/:slug', to: 'home#menu_products', as: 'product_menu'
  get '/page/:slug', to: 'home#page_detail', as: 'page_detail'
end
