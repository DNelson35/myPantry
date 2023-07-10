# myPantry 

myPanty is a react application that uses a Ruby on Rails backend API to manage its data and user authentication. To get a better understanding of the backend API, please click [here](https://github.com/DNelson35/phase-4-react-rails-project/blob/main/README.md)

## About

myPantry is an application designed to serve as a comprehensive home inventory system for tracking cooking items. With myPantry, you can efficiently manage the quantity and expiration dates of the items in your inventory. The application offers a user-friendly interface for creating and organizing items, allowing you to easily keep track of what you have.

One of the standout features of myPantry is its powerful search functionality. The application provides a robust search feature that enables you to quickly find specific items within your inventory.

In addition to searching within your inventory, myPantry allows you to explore the extensive database of items shared by other users. This means you can easily discover new items to add to your inventory. The search feature ensures that you can efficiently navigate through a vast collection of items, making it a valuable tool for managing your inventory.

Another notable feature of myPantry is its collaborative nature. Users can create new items that are visible to all other users of the application. When entering the name of an existing item on the items page, the corresponding form for adding items to your inventory will automatically populate with the item's data. This streamlines the process of adding items and ensures consistency across users.

It is important to note that complete information is required when adding items to your inventory. All form fields must be filled out to ensure accurate tracking. Once an item is added to your inventory, you have the flexibility to update or delete it as needed. Updates can be made to the item's quantity or expiration date, allowing for efficient management of your inventory. When an item is deleted from your inventory, it is removed from your list but remains available on the items page for future reference by all users.

To maintain the usefulness of the application for all users, please be considerate when entering item details such as name, description, and category. Clear and descriptive information will greatly enhance the usability and effectiveness of myPantry for everyone.

## User Experience

Upon logging in or creating an account, users will be directed to the home page of our application. Initially, their inventory table will be empty, accompanied by a form to add new items. As users begin typing in the name section of the form, a dropdown list will appear, displaying all available items in the inventory. Users can choose from the list or continue filling out the form if their desired item is not present. If a selection is made, the remaining fields of the form will automatically populate with the chosen item's data, allowing users to enter the expiration date and quantity. In the absence of a selection, users must manually input information in the name, description, category, expiration, and quantity fields before submitting the form.

Upon pressing the save button, the table will populate with the new item. Simultaneously, the item will also be added to the items page. The user's inventory table will showcase relevant details, such as item ID, name, description, category, quantity, and expiration date (not necessarily in that order). Additionally, an edit button (✏️) and a delete button (🗑️) will be provided for each item. Selecting the edit button will convert the expiration and quantity fields into input fields, displaying the current values. If only one of the fields is modified, the respective value will update while retaining the other. If both fields are changed, pressing enter will update both values, reverting the item on the table to its read-only form.

If users choose to delete an item, it will be removed from their inventory but remain accessible on the items page for future use. It is important to note that duplicate items cannot be created if an identical name already exists in the items table. In such cases, the form will automatically populate with the existing item's data, and it will solely be added to the user's inventory. However, creating a duplicate item within the inventory is permissible as long as it possesses a distinct expiration date. Any attempt to add an item with the same name and expiration date will trigger an error message. To facilitate item search within the inventory, users can utilize the search bar on this page and filter results by name.

The items page showcases all items created by users. This page serves as a platform for users to explore new items and review their descriptions. To facilitate item discovery, users can employ the search bar to find specific items of interest. It is important to note that the items page is purely for viewing purposes, and users do not possess editing, creation, or deletion capabilities for the listed items.

At the top of the page, a navigation bar will be displayed, featuring the application's name, along with links to the home page and the items page. Users will also find a search bar, their username, and a logout button. The search bar will function dynamically, adapting to the current page displayed, allowing users to search for items by name. Upon clicking the logout button, users will be securely signed out and redirected to the login page. Selecting either the home or items link will seamlessly navigate users to the respective page.

## How It Works

The following sections will describe how each part of the application works to provide the user with a great user experience. for more information about the backend code please refer to the link at the top of the page.

## LogIn

Upon the user's initial navigation to the site, an automatic background login attempt is initiated. A fetch request to the '/me' endpoint is made, transmitting the current session data stored in cookies via a GET request to users#show action. This triggers the execution of the authorize method on the backend. If the session already exists and the user is logged in, the show method is invoked, returning the user object to the front-end and seamlessly redirecting the user to the home page. However, if the user is not logged in or the session data is not found in the cookies, the user is promptly directed to the login page. This streamlined login process ensures a smooth user experience while maintaining security and session management.

When a user attempts to log in to the application by filling out the login form and clicking the login button, the application sends a request to the backend server. The backend server captures and processes this request, which is directed to the '/login' route. Upon receiving the request, the sessions#create action is triggered on the backend. Within this action, the user's provided credentials are authenticated, and if the authentication is successful, a session is created and the corresponding user object is returned. Once the user object is received, it is assigned to the user state on the front-end. The front-end checks for a non-null user state, and if it exists, the user is automatically navigated to the application's home page.

## After Login

Upon successful login, the user is automatically redirected to the home page. Simultaneously, an additional fetch request is initiated to retrieve the items list. This fetch request is directed to the '/items' route, specifically the items#index action on the backend. It is important to note that the items#index action is executed only after the backend's authorize method is invoked and confirms the user's authorization. If the user is authorized, the items array is populated with all the corresponding item objects.

Moreover, when the login is successful, the path is set to the home page, triggering the rendering of the home page in the app component's routes. This configuration serves two purposes. Firstly, it ensures that the home page is the initial page displayed to the user upon logging in. Secondly, it allows sufficient time for the items table to populate with data fetched from the server.

## Home page / Items Page

Once on the home page, the user's inventory items (user.user_items) are utilized to provide two key functionalities. Firstly, they contribute to displaying the total quantity of items on the page, offering an overview of the inventory's size. Secondly, they serve as the underlying data source for the item display, albeit indirectly. Notably, the search feature is already active upon page load, leveraging the user_items to establish the initial filter when the search bar is left blank. Subsequently, as the user interacts with the search bar, the user_items are dynamically filtered based on the search query, and the resulting filteredItems are assigned as the displayed items on the page. It is worth highlighting that a similar approach is employed on the items page, utilizing its own state (filteredItemsList) and the array of item objects returned from the items fetch to govern the displayed items.

## Adding Items

when the user attempts to add a new user_item to the inventory, by filling out and submiting the form on the home page. A POST request is made to the '/user_items' route on the backend this hits the user_items#create action. Again before this action can run the authorize method will be executed to ensure that the user is authorized. If the user is authorized the action will be executed. when the action is executed it will first attempt to find the item in the inventory. If the item already exists it will create the user_item and form the association to the existing item then return the newly created user_item to the frontend. if the item does not exist then the item will be created with the users input and the user_item will be created using the newly created item and user input. the user_item obj will then be returned to the frontend to update the users state by adding the new item to the user.user_items list. it is important to note that before the item or user_item is created it will undergo a series of validations to ensure that the item meets the correct specifications. if at any point the item fails to be created due to failed validation, incomplete data, or unpermitted params and error will occur and the item will not be created, an error message will be sent back to the front-end to inform the user of what steps to take to ensure an appropriate request is sent.

When the sate for the user is successfully updated the item will be displayed in the inventory. if the item did not previously exist in the items list the items state will also be updated to display the newly created item on the items page.

```javascript
const onItemFormSubmit = (e) => {
    e.preventDefault()
    fetch('/user_items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemInput)
    })
    .then(resp => {
      if(resp.ok){
        resp.json().then(userItem => updateItems(userItem))
      }else{
        resp.json().then(err => alert(err.errors))
      }
    })
    setItemInput({
      name: '',
      description: '',
      category: '',
      expiration_date: '',
      quantity: ''
    })
  }

   const updateItems = (userItem) => {
    // extracting uneeded properties to get the itemProps
    const {quantity, expiration_date, id, item_id, ...itemProps} = userItem
    // we do this because we only want to update the items if the item dosnt already exist in the items array if it does exist we don't want to add the new item.
    const updatedItems = items.some(item => item.id === item_id) // checks if any items in items array has an id === to the item_id and ruturns a true or false value.
      ? [...items] // returns a copy of items if condition is true
      : [...items, {id: item_id, ...itemProps}] // using itemProps and item_id to add the new item if the condition is false.

    setUser({
      ...user,
      user_items: [...user.user_items, userItem], // sets the user_items to include the new userItem
    });
  
    setItems(updatedItems); // sets items to a copy or to include the new item.
  }
```

## Displaying Items

To display the items and user_items, they are passed as props to a custom table component. Within this table component, the data serves two different purposes. Firstly, the keys are used to generate the table headers, and then the item objects are used to populate the table data.

To render the table headers, we iterate over the object keys of the first item object in the items array. Each key is wrapped in a <th> element and rendered in the DOM. The item objects are also iterated over, but this time they are passed into another custom component called TableRow.

Inside the TableRow component, the item object is used to generate the row's data. Additionally, it is used to conditionally render an input field when the edit state is set to true. Let's examine the code that controls this feature:

```javascript
const tableData = Object.entries(itemObj).map(set => {
  // Each 'set' represents a key-value pair in the item object.
  if (isEditable && ['quantity', 'expiration_date'].includes(set[0])) {
    // Here, we check if 'isEditable' is true and if the 'set' at index [0] includes either 'quantity' or 'expiration_date'.
    // If true, we return the following JSX:
    return (
      <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
        <form onSubmit={onSubmit}>
          <input type="text" className='border border-blue-400' placeholder={set[1]} name={set[0]} value={updateForm[set[0]]} onChange={onChange} />
          <button type='submit'></button>
        </form>
      </td>
    );
  } else {
    // If the condition is false, we return the following JSX:
    return (
      <td className="px-6 py-4 whitespace-nowrap" key={`${set}`}>
        <div className="text-sm text-gray-900">{set[1]}</div>
      </td>
    );
  }
});
```

This implementation allows only the 'expiration' and 'quantity' fields to become editable inputs when the user clicks the edit button. Otherwise, they are displayed in their read-only state.

## Deleting Items

When the user clicks the delete button on a table row, a DELETE request is sent to the '/user_items/item_id' endpoint, triggering the user_items#destroy action on the backend. Within this action, the item corresponding to the provided ID is located, and subsequently destroyed. The backend then responds with a 'no_content' status code to the frontend.

On the frontend, upon receiving the response with an 'ok' status, we utilize the setUser function to update the user.user_items state. The state is filtered to create a new list where all items with IDs matching the deleted item are excluded, while retaining the remaining items. By doing so, the deleted item is effectively removed from the user.user_items list, and the state is updated accordingly.

This mechanism ensures the synchronization between the frontend and backend, reflecting the deletion of the item from the user's inventory.

```javascript
 const onDelete = (itemObj) => { 
    fetch(`/user_items/${itemObj.id}`, {
      method: 'DELETE',
    })
    .then(resp => {
      if (resp.ok) {
        //  how the items are filtered out when deleted
        setUser({...user, user_items: user.user_items.filter(currItem => currItem.id !== itemObj.id)})
      }
    })
  }
```

## Editing Items

When the user clicks the edit button and submits the edited input, a PATCH request is sent to the '/user_items/item_id' endpoint, specifically targeting the user_items#update action on the backend. Within this action, the user_item corresponding to the provided item ID is retrieved. The update method is then invoked, passing in the user's input, resulting in the modifications being applied to the item. Once saved, the updated item is returned as the response to the frontend.

Before sending the request, the following code snippet demonstrates the frontend logic:

```javascript
 const onSubmit = (e) => {
    e.preventDefault()
    // here we are checking if either value has changed if the update form is equal to a blank string it will be a falsy value and move on to the other condition. or takes the first truthy value. \
    // so in this case if either is left blank it is set equal to the current value on the itemObj.
    const updatedForm = {
      quantity: updateForm.quantity || itemObj.quantity,
      expiration_date: updateForm.expiration_date || itemObj.expiration_date,
    };

    fetch(`/user_items/${itemObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedForm), // we then send the updated form in the body of the request
    })
    .then(resp => {
      if(resp.ok){
        resp.json().then(item => updateUserItem(item)) // in the resp we take the item and update the user_item state.
      }else{
        resp.json().then(err => alert(err.errors))
      }
    })
    setIsEditable(false) // then set isEditable back to false
  }
```

In this code, we construct an updatedForm object by assigning the new values provided in the input fields or retaining the current values from the itemObj if the input fields were left blank. The updatedForm object is then included in the request body as JSON. Upon receiving a response with an 'ok' status, the updated item is extracted from the response and passed to the updateUserItem function.

The updateUserItem function is responsible for updating the user_items state. It utilizes the setUser function to modify the previous state by mapping over the prevUser.user_items array. For each userItem, it checks if the userItem.id matches the updatedItem.id. If a match is found, it returns the updatedItem, indicating that the item has been updated. Otherwise, it returns the original userItem. This way, the user_items list is updated with the modified item, ensuring that the state reflects the changes made by the user.

Finally, the setIsEditable state is set to false, indicating that the editing mode has been deactivated.

## Logging Out


When a user decides to log out of the application, they can initiate the process by clicking the logout button. This action triggers a DELETE request to the '/logout' endpoint, specifically targeting the sessions#destroy action on the server-side. In this action, the user's ID is first removed from the session, and then a response of 'no_content' is sent back to the frontend.

On the frontend, upon receiving the response with an 'OK' status, the setUser function is invoked and the user state is set to null. This action effectively resets the application and automatically redirects the user to the login page. To ensure the proper path is displayed on the login page, I also include a navigation redirect to the login route. This guarantees that the user is presented with the appropriate path upon logout.

By following this process, the user is successfully logged out of the application, and subsequent access to the application's features will require them to log back in.

```javascript
const onLogOut = () => {
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(resp =>{
            if(resp.ok){
                setUser(null) // will automatically cause the application to render the login page
                navigate('/login') // done so the login page displays an appropriate path on logout. when navigating to the page if the user is not logged in the login page will not have this path.
            }
        })
    }
```

