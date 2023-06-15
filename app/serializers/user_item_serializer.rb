class UserItemSerializer < ActiveModel::Serializer
  attributes :quantity

  belongs_to :user
  belongs_to :item
end
