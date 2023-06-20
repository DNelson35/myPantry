
User.create(name: "test", username: "test", password: "123", password_confirmation: "123")
10.times do
    Item.create(
        name: Faker::Food.ingredient,
        sku: Faker::Barcode.ean,
        description: Faker::Lorem.words(number: 5) ,
        category: 'general',
        image_url:Faker::Alphanumeric.alpha(number: 5)
    )
end

10.times do |i|
    UserItem.create(user_id: 1, item_id: i, quantity: Faker::Number.number(digits: 2), experation_date: Faker::Date.forward(days: 23))
end