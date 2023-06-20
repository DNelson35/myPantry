class ItemWithExtraAttributesSerializer < ActiveModel::Serializer
  attributes :id, :name, :sku, :description, :category, :image_url, :quantity, :experation_date

  def quantity
    user_item = object.user_items.find_by(item_id: object.id)
    user_item.quantity if user_item
  end
  def experation_date
    user_item = object.user_items.find_by(item_id: object.id)
    user_item.experation_date if user_item
  end
end
