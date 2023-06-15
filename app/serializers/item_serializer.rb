class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :sku, :description, :category, :image_url, :quantity

  def quantity
    user_item = object.user_items.find_by(item_id: object.id)
    user_item.quantity if user_item
  end
end
