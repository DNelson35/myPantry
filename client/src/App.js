import { useState, useEffect } from 'react';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import useUserContext from './hooks/useUserContext';
import { Routes, Route, useLocation } from 'react-router-dom'
import Items from './pages/Items';
import LogIn from './pages/LogIn';
import useSearch from './hooks/useSearch';

function App() {
  // TODO: write Readme
  // TODO: write resume
  // TODO: Record Video
  // TODO: SCHEDUAL APPOINTEMENT FOR INSTURCTOR AND REVIEW
  
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
    
    const updatedItems = items.some(item => item.id === item_id)
      ? [...items]
      : [...items, {id: item_id, ...itemProps}]

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
        <Route path='/' element={<Home items={items} search={search} user={user} updateItems={updateItems} filteredItems={filteredItems}/>}/>
        <Route path='/items' element={<Items items={filterItemsList}/>}/>
        <Route path='/login' element={<LogIn setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
