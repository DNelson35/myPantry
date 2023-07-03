class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :experation_date

  belongs_to :user 
  belongs_to :item
end
