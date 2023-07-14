class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :description

  has_many :users
end
