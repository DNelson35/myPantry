    // Working code for updating itmes temp hold untill new code is tested 
    
    // const updateItems = (userItem) => {
    //   const itemId = userItem.item.id;
    
    //   if (!items.some(item => item.id === itemId)) {
    //     setUser({
    //       ...user,
    //       user_items: [
    //         ...user.user_items,
    //         {
    //           ...userItem.item,
    //           id: userItem.id,
    //           quantity: userItem.quantity,
    //           expiration_date: userItem.expiration_date,
    //           item_id: userItem.item.id
    //         },
    //       ],
    //     });
    
    //     setItems([...items, userItem.item]);
    //   } else {
    //     setUser({
    //       ...user,
    //       user_items: [
    //         ...user.user_items,
    //         {
    //           ...userItem.item,
    //           id: userItem.id,
    //           quantity: userItem.quantity,
    //           expiration_date: userItem.expiration_date,
    //           item_id: userItem.item.id,
    //         },
    //       ],
    //     });
    //   }
    // };

    //  form item input working code replaced with code to autofill keep untill tested.
     // const updateItemInput = (e) => {
    //   setItemInput({ ...itemInput, [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()});
    // };