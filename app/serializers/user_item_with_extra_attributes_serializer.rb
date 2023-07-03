class UserItemWithExtraAttributesSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description, :quantity, :experation_date, :item_id, :image_url,

  def item_id
    object.item.id
  end

  def name
    object.item.name  
  end

  def category
    object.item.category
  end

  def image_url
    object.item.image_url
  end

  def description
    object.item.description
  end
end
