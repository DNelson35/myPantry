class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :total_items

  has_many :items
  
  def total_items
    object.user_items.sum(:quantity)
  end
end
