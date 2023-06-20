class UserItem < ApplicationRecord
    belongs_to :user
    belongs_to :item

    validates :quantity, numericality: { greater_than: 0, allow_nil: true }, unless: :initial_quantity?

    def initial_quantity?
      quantity.nil? || quantity.zero?
    end
    
end
