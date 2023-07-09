# Backend Ruby on Rails API for myPantry

This Ruby on Rails (RoR) API is used to authenticate, manage, and provide data for the React front-end application located in the client folder [here](https://github.com/DNelson35/phase-4-react-rails-project/tree/main/client).

# Rails
Rails is a backend web application framework that serves as the foundation for this API. It handles the heavy lifting of processing requests, managing data, and coordinating with the database. Rails allows the React front-end to communicate seamlessly with the server. If you would like to know more about how Rails works behind the scenes, please read this amazing blog post "[What’s Happening Behind The Scene of a Rails Application](https://medium.com/committed-engineers/whats-happening-behind-the-scene-of-rails-applications-b33becd5e52a)" by Jean-Michel Gigault

### Using the API flag
This Rails application was created using the --api flag.

```zsh
rails new example-project -T -d=postgresql --api
#  -T skips creation of test files
#  -d=postgresql configures PostgreSQL as the database instead of SQLite
#  --api configures the app with a limited set of middleware and skips views/helpers/assets on resource generation.
```

Since the application was created using the --api flag, we had to add back in some of the features needed for this application. For example, installing the serializer gem in the Gemfile, so we can transform and limit data returned to the user.

```gemfile
gem "active_model_serializers", "~> 0.10.13"
```
Also, since we wanted to include authentication, sessions, and cookies need to be enabled in the config/application.rb file.

```ruby
## Adding back cookies and sessions middleware
config.middleware.use ActionDispatch::Cookies 
config.middleware.use ActionDispatch::Session::CookieStore

# Use SameSite=Strict for all cookies to help protect against CSRF
config.action_dispatch.cookies_same_site_protection = :strict
```
### Features Used

* Data Management:
The API provides robust data management capabilities, allowing seamless integration with a database using Ruby on Rails' ActiveRecord ORM. It supports Create, Read, Update, and Delete (CRUD) operations on relevant resources, ensuring efficient manipulation of data.

* Authentication and Authorization:
The API incorporates secure authentication and authorization mechanisms, enabling user registration, login, and access control. Session-based authentication ensures that only authenticated users can access protected resources.

* Validation and Error Handling:
The API includes comprehensive validation and error handling mechanisms. It verifies incoming data, enforcing proper formats, data types, and constraints to maintain data integrity. Detailed error messages and appropriate HTTP status codes are provided to help clients understand and resolve issues.

* Relationship Management:
Leveraging Ruby on Rails' powerful ActiveRecord associations, the API allows managing relationships between different resources. It supports one-to-one, one-to-many, and many-to-many associations, providing efficient navigation and retrieval of related data.

# My API: How It Works

By using Rails, I was able to utilize the features listed above to create my application. In the following sections, we will discuss what my API does for the front-end in the client folder.

## Creating and Using Endpoints

To create endpoints for the front-end application to use, they first need to be defined. To do this, we go to the config/routes.rb file. Inside this file, we define the routes that we need and the actions to attach to them. Fortunately, Rails provides a method for creating routes and associating them with specific actions. This method is called resources. When we use resources, by default, we are given all of the CRUD endpoints for that controller. If not all CRUD resources are needed, we can use the only option to specify which resources we want. Let's look at the config/routes.rb file:

```ruby
Rails.application.routes.draw do
  # Here we use the `only` option to get back "only" the endpoints related to index, show, and create
  # `resources` automatically attaches the path to a controller action with the matching name
  # For example, index = index, show = show, etc.
  resources :items, only: [:index, :show, :create]
  
  # Here we do not use the `only` option, so all CRUD endpoints will be returned
  resources :user_items

  # Here we define custom endpoints by providing a method, path, and controller action
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  get '/me', to: 'users#show'
  delete '/logout', to: 'sessions#destroy'
end
```
With the above code, we get the following endpoints:

* GET /items: Retrieves a list of items.
* GET /items/:id: Retrieves details of a specific item.
* POST /items: Creates a new item.
* GET /user_items: Retrieves a list of user_items.
* POST /user_items: Creates a new user_item.
* GET /user_items/:id: Retrieves details of a specific user_item.
* POST /signup: Creates a new user account.
* POST /login: Logs in a user.
* GET /me: Retrieves the currently logged-in user's details.
* DELETE /logout: Logs out the current user.

## How Routes Work

When a request is received by our Rails API, it goes through a series of steps to determine the appropriate controller action. First, the request hits the Rack middleware, which then passes it to the routing middleware. The routing middleware analyzes the method and path of the request, comparing it against the routes defined in routes.rb. When a matching route is found, Rails automatically creates an instance of the corresponding controller class and invokes the specified action.

For example, consider the code snippet provided above in config/routes.rb. If we send a DELETE request to the '/logout' route, Rails will identify the matching route and execute the associated controller action, which in this case is the destroy action. This action handles the necessary logic to log out the user or perform any other relevant tasks.

## Controllers

In a Ruby on Rails API, controllers act as intermediaries between client requests and the corresponding actions. They handle request processing, data retrieval, manipulation, and response generation. Each controller is a Ruby class that inherits from ActionController::Base.

When a request is received, Rails maps it to a specific controller action based on the defined routes and the request's HTTP method. Controller actions execute the necessary logic, interact with models, perform error handling, and prepare the response.

## How Controllers Work
As described above, when the route hits the controller, the action specified in the request is executed. Let's look at one of the controllers:

```ruby
class UserItemsController < ApplicationController
  # Other actions ...
  
  def create 
    item = Item.find_by(name: params[:name])
    
    if item
      user_item = create_user_item(item)
      render_with_extra(user_item, :created)
    else
      UserItem.transaction do # Fails, rolls back, and raises an exception 
        new_item = Item.create!(item_params) # Fails, raises an exception 
        user_item = create_user_item(new_item)
        render_with_extra(user_item, :created)
      end
    end
  end
  
  private
  
  def create_user_item(item)
    @current_user.user_items.create!(item_id: item.id, expiration_date: params[:expiration_date], quantity: params[:quantity])
  end
  
  def render_with_extra(user_item, status)
    render json: user_item, serializer: UserItemWithExtraAttributesSerializer, status: status # Uses specified serializer
  end
end
```

The code above shows a shortened version of one of my controllers. In the controller, we use instances of the model to get data to return in response to a request. When an action in the controller is run, like the create action above, it will run the code inside the action. In the controller, we are using render to send JSON data back to the front-end. In this case, we are returning the user_item if the action runs successfully, as well as a successful status code.

You may notice that some code is commented out, which can raise an exception. If an exception is raised, you can handle it with rescue. In my application, I use rescue_from in the application controller, which is inherited by all of my controllers. I will show the code for the application controller below. When an exception is raised on create! with the bang operator, it is raised because there was a problem with the create method, either a param was sent that isn't allowed or a validation on the model failed. This will cause the create method not to complete, and the exception will be raised, and the rescue code will be run instead. The same goes for the transaction: if any of the code in the transaction fails, anything completed will be rolled back, and an exception will be raised instead.

## Application Controller
```ruby
class ApplicationController < ActionController::API
  include ActionController::Cookies
  
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  rescue_from ActiveModel::ValidationError, with: :render_invalid

  before_action :authorize
  
  private
  
  def authorize 
    @current_user = User.find_by(id: session[:user_id])

    render json: { errors: ["Not Authorized"] }, status: :unauthorized unless session.include?(:user_id)
  end
  
  def render_invalid(e)
    render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
  
  def render_not_found
    render json: { errors: 'Not Found' }, status: :not_found
  end
end
```

This is the application controller that is inherited in all of the other controllers. Here, I define what to do if an exception is raised inside my controllers, and I also handle if I want certain conditions to be met before the controller action can be executed, such as authorization. In the above code, you will see a before_action macro that is followed by authorize. This means that unless otherwise specified, I want authorize to run before the actual action runs. authorize will run and check if there is a current user. If no current user exists, an error will be sent back, and the action will not be executed.

You may also notice the rescue_from macros. These are used to handle the exceptions that may be raised in my controllers. Each one is responsible for a different type of exception, such as RecordInvalid. If my create action were to fail and raise an exception of user_items.create!, the bang operator tells create to raise the exception if it fails. When it does fail, it will raise a RecordInvalid exception, which will be captured with my rescue_from ActiveRecord::RecordInvalid. When that happens, the with: option will tell it to run the function I provide. In the case of RecordInvalid, I have render_invalid set to run, which uses render to send a JSON response back to the frontend with an error message, telling the frontend what went wrong with the request. The create action I used as an example before can also raise ValidationError if one of the validations in the model were to fail.

You may also see a section of code above that includes ActionController::Cookies. This allows my controllers to access sessions and cookies used in the authentication process.

## Models

In a Ruby on Rails API, models represent the data structures and business logic of the application. They interact with the database, providing methods for data manipulation and validation. Models are Ruby classes that inherit from ActiveRecord::Base and encapsulate the data layer.

Models in Rails simplify database interactions by following conventions. They define the structure and relationships of database tables and offer convenient methods for creating, retrieving, and updating records. Models abstract away complexities and provide an object-oriented interface for working with data. Here is one of the models form the application.

```ruby
class User < ApplicationRecord
    #creates relationship between models
    has_many :user_items, dependent: :destroy
    has_many :items, through: :user_items
    # adds in functionality needed for authentication will discuss below
    has_secure_password 
    # Validations ensure that the instance cannot be created unless certain conditions are met.
    # The following validations check for the presence of the `username` and `name` attributes.
    # If either of these attributes is empty or nil, a validation exception will be raised,
    # preventing the instance from being saved to the database.
    validates_presence_of :username
    validates_presence_of :name
end
```

The code snippet above is the definition of a User model within my application. This model represents users in the application and sets up the User relationship to other models, validations for creating a user, and authentication methods for creating and authenticating users. 

The model establishes relationships between the User model and other models within the application. It utilizes the has_many creating an association with the UserItem model. To maintain data integrity, the dependent: :destroy option ensures that when a user is deleted, all corresponding user items are also deleted. Additionally, the code employs a has_many :through association, linking the User model with the Item model through the UserItem model. This association enables users to possess multiple items through the user items join table.

The model also integrates authentication functionality for the User model by using has_secure_password macro within Rails. This macro incorporates features like password encryption, validation, confirmation, and authentication directly into the model. By employing the bcrypt hashing algorithm, the macro automatically adds a password_digest attribute to the model's associated database table, securely storing the encrypted version of the password. Moreover, the code enforces the presence of the username and name attributes through validations. These validations ensure that these attributes cannot be empty or nil when saving a user instance to the database. If any of the validations fail, a validation exception will be raised, effectively preventing the instance from being persisted in the database.

Overall, the code establishes the User model and establishes associations with relevant models such as UserItem and Item. Additionally, it integrates authentication functionalities through has_secure_password and incorporates validations to maintain data integrity within the model.

## Authentication

To explain how the authentication in my application works we will go through it step by step starting at the creation of the user on request from the frontend.

### Signing Up

When an POST request is sent to this route '/signup' we will be making a request to this controller 'app/controllers/users_controller.rb' and the create action will be executed. here is the code: 

```ruby
class UsersController < ApplicationController
    before_action :authorize, only: :show # if request to show path authorize in application controller will run before show action
    def create 
        user = User.create!(user_params) # will check validations and password_confirmation === password
        session[:user_id] = user.id # session[:user_id] created and set equal to user.id
        render json: user, status: :created # sends user object back to frontend in json format with status of created if create is successful
    end

    def show
        render json: @current_user
    end

    private

    def user_params
        params.permit(:username, :name, :password, :password_confirmation)
    end
end
```

 When this action is triggered by a request to create a user, the controller performs the following steps.
 
  1. it attempts to create a new user based on the parameters provided in the request. The create! method is invoked on the User model, which performs validations on the provided parameters, including the presence of username, name, password, and a matching password_confirmation. The has_secure_password macro from the model will check if the password matches the password_confirmation. if it does it will assign a salt and encrypt the password before saving the new record to the database. if a validation fails or password_confirmation does not match the password then an exception will be raised and the data will not be stored.
  
  2. After successfully creating a new user, we create a new session and add a attribute to the session called :user_id and set it equal to user.id. This session will be created and stored in the sessions store on the server. when the response to the server is sent it will automatically be sent with a set-Cookie header including the session id that will tell the browser to store this session in cookies. Each request to the server after this will include the session id in the Cookie header. so when we run the authorize method before every action. the server will look up the session included in the cookie header retrive it from the session store and set it to the current session.

```ruby
    def authorize 
        @current_user = User.find_by(id: session[:user_id]) 

        render json: {errors: ["Not Authorized"]}, status: :unauthorized unless session.include?(:user_id)
    end
 ```

 so when we authorize a user we will get the session that is unique to that user and find the user by id that is equal to the session[:user_id] we created when we created the user. if a user is not found or if the session doesn't exist then a status of :unauthorized will be sent back.

 In this case a request is made to the '/me' route authorize will run before the show action. when the request is made the it will contain the cookie header including the session id. that session id will then be looked up by the server and set the session to the matching session in the session store. the authorize method will then use that session when the user.find_by(id: session[:user_id]) runs the session if the session has a user_id the user will be found that has the matching user_id. if the session dosn't exist or dosn't have a :user_id attribute then a status of :unauthorized will be sent back.

In summary, the create action handles the creation of a user in the UsersController. It validates the provided parameters, creates a new user record, establishes a session for the user, and returns a JSON response containing the details of the created user.

### Logging In

When a user attempts to log in the process is only a bit different from the signUp. lets take a look at the code. 

```ruby
class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create ## we don't want the authorize to run before the create because no user is signed in yet.
    def create 
        user = User.find_by(username: params[:username]) # the user should exist so we attempt to find them
        if user&.authenticate(params[:password]) # if we have a user then we want to make sure the password they provide matches the password in the database for that user.
            session[:user_id] = user.id  # same as before
            render json: user, status: :created # if everything is successful we return the user with a status of :created
        else
            render json: {errors: 'Invalid Username or Password'}, status: :unauthorized # if somthing is wrong we return an error message with a status of :unauthorized
        end
    end

    def destroy
    # wen a user loggs out we delete the session[:user_id] from the current session.
        session.delete :user_id 
        head :no_content # we send back a no-content response
    end
end
```
  When the create action is triggered by a POST request to '/login', the controller performs the following steps.

1. it attempts to find the user by the username sent in the request using params[:username] and assign the return value to the variable user.

2. next since the & operator returns the first falsy value or the last truthy one. if the user is false we will immediately go to the else statement and return a error message with a status of :unauthorized. if the user exists then we will continue to the next code which is authenticate(params[:password]). this will take the password from params and use the salt associated with that user in the password_digest and encrypt it then check if the encryption matches the encrypted password stored for that user. If the passwords match then we can we get back a truthy value and continue the code.

3. If the if statement is truth we then move on to create the session. the session will be created and assigned the attributes user_id set to the user.id. same as with the sign in. when the response is sent back it will contain the set-Cookie header with the session id. every request after that will send the cookie header with the session id.

4. next we use render json: user to send the user object back to the front-end in json format. with a status code of :created

5. If the if statement is false we will send back an error message with a status code of :unauthorized

In summary the create method handles the user login process by finding a user based on the provided username and authenticating the provided password. If the authentication is successful, a session is created for the user, and their ID is stored in the session. The method returns the user object if the login is successful, and an error message if the credentials are invalid.

Now if a delete request is sent to '/logout' it is very simple the session[:user_id] is deleted and a response of no_content is sent back. this makes it so our authorize method will fail for any request except to login or sign up. on the front-end the user is also set to null causing the user to be navigated back to the login page.


## serialization

Using serializers, you can customize the data representation to meet the requirements of the client application. This means you can choose to include only the necessary fields and omit any sensitive or unnecessary data. Serializers provide flexibility in shaping the response payload, allowing you to present the data in a simplified and meaningful way while optimizing the network transfer.

In summary, serializers provide the ability to transform and tailor the data returned by the backend API, ensuring that only the relevant information is sent to the client application, improving performance, and maintaining data privacy and security. For more information on serialization please check out my blog post [Ruby Serializers: Simplifying Data Serialization for Web Developers](https://dev.to/dnelson35/ruby-serializers-simplifying-data-serialization-for-web-developers-26jl)


