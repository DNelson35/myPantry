class Item < ApplicationRecord
    has_many :user_items
    has_many :users, through: :user_items

    validates_presence_of :name
    validates :name, uniqueness: true
    validates_presence_of :category, message: 'please select a value'
    validates_presence_of :description, message: 'Please enter a value'
   


end
