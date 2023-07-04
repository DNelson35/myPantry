class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :expiration_date

  belongs_to :user 
  belongs_to :item
end
