class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description, :quantity, :expiration_date, :item_id

  def item_id
    object.item.id
  end

  def name
    object.item.name  
  end

  def category
    object.item.category
  end

  def description
    object.item.description
  end
end
