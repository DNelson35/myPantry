import { useState, useEffect } from 'react';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import useUserContext from './hooks/useUserContext';
import { Routes, Route, useLocation } from 'react-router-dom'
import Items from './pages/Items';
import LogIn from './pages/LogIn';
import useSearch from './hooks/useSearch';

function App() {
  
  const { user, setUser } = useUserContext()
 
  const [items, setItems] = useState([])
  const {filterItemsList, filteredItems, search, setSearch, itemSearch, setItemSearch} = useSearch(user, items)
  const location = useLocation()
    
  useEffect(()=> {
    fetch('/items')
    .then(resp => {
      if (resp.ok){
        resp.json().then(itemData => setItems(itemData))
      } else {
        resp.json().then(error => console.log(error.errors))
      }
    })
  }, [])

  const updateItems = (userItem) => {
    const {quantity, expiration_date, id, item_id, ...itemProps} = userItem
    const item = items.find(item => item.id === item_id)
    let updatedItems
    
    if(item && item.users.some(itemUser => user.id === itemUser.id)){
      updatedItems = [...items]
    } else if(item){
      updatedItems = items.map(currItem =>{
        if(currItem.id === item.id){
          return {...item, users: [...item.users, {id: user.id, name: user.name}]}
        }else{
          return currItem
        }
      } )
    } else {
      updatedItems = [...items, {id: item_id, ...itemProps, users: [{id: user.id, name: user.name}]}]
    }
    
    setUser({
      ...user,
      user_items: [...user.user_items, userItem],
    });
  
    setItems(updatedItems);
  }

  return (
    <div className='overflow-x-hidden'>
      {location.pathname !== '/login' && <NavBar search={search} setSearch={setSearch} itemSearch={itemSearch} setItemSearch={setItemSearch} />}
      <Routes>
        <Route path='/' element={<Home items={items} setItems={setItems} search={search} user={user} updateItems={updateItems} filteredItems={filteredItems}/>}/>
        <Route path='/items' element={<Items filterItemsList={filterItemsList} items={items} setItems={setItems} />}/>
        <Route path='/login' element={<LogIn setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
