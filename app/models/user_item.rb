class UserItem < ApplicationRecord
    belongs_to :user
    belongs_to :item

    validates :quantity, numericality: { greater_than: 0, allow_nil: true }, unless: :initial_quantity?
    validates_uniqueness_of :expiration_date, scope: [:user_id, :item_id], message: "has already been taken for this user and item"
    validates_presence_of :expiration_date

    def initial_quantity?
      quantity.nil? || quantity.zero?
    end
    
end
