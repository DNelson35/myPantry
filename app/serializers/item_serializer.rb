class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :sku, :description, :category, :image_url

end
