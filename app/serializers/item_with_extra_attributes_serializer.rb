class ItemWithExtraAttributesSerializer < ActiveModel::Serializer
  attributes :id, :name, :sku, :description, :category, :image_url, :quantity, :expiration_date

  def quantity
    user_item = object.user_items.find_by(item_id: object.id)
    user_item.quantity if user_item
  end
  def expiration_date
    user_item = object.user_items.find_by(item_id: object.id)
    user_item.expiration_date if user_item
  end

end
