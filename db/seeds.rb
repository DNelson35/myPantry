
User.create(name: "test", username: "test", password: "123", password_confirmation: "123")
User.create(name: "test2", username: "test2", password: "123", password_confirmation: "123")
10.times do
    Item.create(
        name: Faker::Food.ingredient,
        description: Faker::Lorem.sentence,
        category: 'General',
    )
end

10.times do |i|
    UserItem.create(user_id: 1, item_id: i, quantity: Faker::Number.number(digits: 2), expiration_date: Faker::Date.forward(days: 23))
end