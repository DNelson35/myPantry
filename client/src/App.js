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
  const [filteredItems, setFilteredItems] = useState()
  const [search, setSearch] = useState('')
  const [itemSearch, setItemSearch] = useState('')
  const [filterItemsList, setFilterItemsList] = useState()
    

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
    
      const updatedUserItems = [
        ...user.user_items,
        {
          ...userItem.item,
          id: userItem.id,
          quantity: userItem.quantity,
          expiration_date: userItem.expiration_date,
          item_id: userItem.item.id
        },
      ];
    
      const updatedItems = items.some(item => item.id === itemId)
        ? [...items]
        : [...items, userItem.item];
    
      setUser({
        ...user,
        user_items: updatedUserItems,
      });
    
      setItems(updatedItems);
    }

    useEffect(() => {
      if(user && search === ''){
        setFilteredItems(user.user_items);
      } else if(user) {
        setFilteredItems(user.user_items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())))
      }
    },[search, user])

    useEffect(() => {
      if(items && itemSearch === ''){
        setFilterItemsList(items)
      } else if(items){
        setFilterItemsList(items.filter(item => item.name.toLowerCase().includes(itemSearch.toLowerCase())))
      }
    },[itemSearch, items])

  if (!user) return <LogIn setUser={setUser}/>

  return (
    <>
      <NavBar search={search} setSearch={setSearch} itemSearch={itemSearch} setItemSearch={setItemSearch}/>
      <Routes>
        <Route path='/' element={<Home items={items} search={search} user={user} updateItems={updateItems} filteredItems={filteredItems}/>}/>
        <Route path='/items' element={<Items items={filterItemsList}/>}/>
      </Routes>
    </>
  );
}

export default App;
