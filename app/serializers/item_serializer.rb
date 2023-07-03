class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description, :image_url

end
