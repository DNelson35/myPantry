class UserSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :user_items, serializer: UserItemWithExtraAttributesSerializer

end
