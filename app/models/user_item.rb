class UserItem < ApplicationRecord
    belongs_to :user
    belongs_to :item

    validates :quantity, numericality: { greater_than: 0, allow_nil: true }, unless: :initial_quantity?
    validate :validate_uniqueness_of_experation_date

  def validate_uniqueness_of_experation_date
    existing_item = UserItem.find_by(user_id: self.user_id, item_id: self.item_id)
    if existing_item && existing_item.experation_date == experation_date
      errors.add(:experation_date, 'Item with the same experation_date already exists')
    end
  end

    def initial_quantity?
      quantity.nil? || quantity.zero?
    end
    
end
