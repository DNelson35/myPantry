class User < ApplicationRecord
    has_many :user_items
    has_many :items, through: :user_items

    has_secure_password 
    
    validates_presence_of :username
end
