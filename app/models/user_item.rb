class UserItem < ApplicationRecord
    belongs_to :user
    belongs_to :item
    
    validates_associated :item
    validates :quantity, numericality: { greater_than_or_equal_to: 0, allow_nil: false }
    validates_uniqueness_of :expiration_date, scope: [:user_id, :item_id], message: "has already been taken for this user and item"
    validates_presence_of :expiration_date

    
end
