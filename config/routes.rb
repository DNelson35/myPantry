Rails.application.routes.draw do
  
  post '/signup', to: 'user#create'

  post '/login', to: 'session#create'

  get '/me', to: 'user#show'

  delete '/logout', to: 'session#destroy'
end
