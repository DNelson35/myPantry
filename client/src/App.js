import { useState, useEffect } from 'react';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import useUserContext from './hooks/useUserContext';
import { Routes, Route } from 'react-router-dom'
import Items from './pages/Items';

function App() {
  const { user, setUser } = useUserContext()

   const [items, setItems] = useState([])
    
    useEffect(()=> {
      fetch('/items')
      .then(resp => {
        if (resp.ok){
          resp.json().then(itemData => setItems(itemData))
        } else {
          resp.json().then(error => console.log(error))
        }
      })
    }, [])

    const updateItems = (userItem) => {
      const itemId = userItem.item.id;
    
      if (!items.some(item => item.id === itemId)) {
        setUser({
          ...user,
          user_items: [
            ...user.user_items,
            {
              ...userItem.item,
              id: userItem.id,
              quantity: userItem.quantity,
              expiration_date: userItem.expiration_date,
              item_id: userItem.item.id
            },
          ],
        });
    
        setItems([...items, userItem.item]);
      } else {
        setUser({
          ...user,
          user_items: [
            ...user.user_items,
            {
              ...userItem.item,
              id: userItem.id,
              quantity: userItem.quantity,
              expiration_date: userItem.expiration_date,
              item_id: userItem.item.id,
            },
          ],
        });
      }
    };
    

  if (!user) return <LogIn setUser={setUser}/>

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home items={items} user={user} updateItems={updateItems}/>}/>
        <Route path='/items' element={<Items items={items}/>}/>
      </Routes>
    </>
  );
}

export default App;
