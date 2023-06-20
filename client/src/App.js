import { useState, useEffect } from 'react';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import useUserContext from './hooks/useUserContext';
import { Routes, Route } from 'react-router-dom'
import Items from './pages/Items';

function App() {
  const { user, setUser } = useUserContext()

   const [items, setItems] = useState(null)
    
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

  if (!user) return <LogIn setUser={setUser}/>

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home user={user}/>}/>
        <Route path='/items' element={<Items items={items}/>}/>
      </Routes>
    </>
  );
}

export default App;
