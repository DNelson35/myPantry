class Item < ApplicationRecord
    has_many :user_items
    has_many :users, through: :user_items

    validates_presence_of :name
    validates :name, uniqueness: true
end
