Rails.application.routes.draw do
  resources :events do
    collection do
      patch :update_order
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "events#index"
end
