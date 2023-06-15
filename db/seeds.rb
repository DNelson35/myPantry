

item_list = [
    {
        name: 'Coke',
        sku: '0001',
        description: 'can of coke',
        category: 'beverage',
        image_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29rZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
        name: 'Bush Baked Beans',
        sku: '0002',
        description: 'can of beans',
        category: 'canned food',
        image_url:'https://media.istockphoto.com/id/173652175/photo/can-of-baked-beans.webp?b=1&s=170667a&w=0&k=20&c=JladC4eJYhE-MnIXMSA9dnK7T157RjhoiSv4z9fmAww='
    },
    {
        name: 'GV Corn',
        sku: '0003',
        description: 'can of corn',
        category: 'canned food',
        image_url:'https://media.istockphoto.com/id/466991841/photo/isolated-canned-corn.webp?b=1&s=170667a&w=0&k=20&c=q2sHbkAcSBJql6r_vUJVWMp9sMSxyjZmavcUGOK8P2o='
    },
    {
        name: 'Lays Dill Pickle Chips',
        sku: '0004',
        description: 'bag of chips',
        category: 'bagged food',
        image_url:'https://media.istockphoto.com/id/1188802926/photo/potato-chips-with-spicy-in-an-open-package-hold-hands-close-up-selective-focus.webp?b=1&s=170667a&w=0&k=20&c=E1vpXO187KEUjX9pghkuOGyDmY_G3_yR9jQp05Jy7q4='
    }
]

item_list.each { |item| Item.create(name: item[:name], sku: item[:sku], description: item[:description], category: item[:category], image_url: item[:image_url]) }