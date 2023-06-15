import LogIn from './pages/LogIn';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import useUserContext from './hooks/useUserContext';
import { Routes, Route } from 'react-router-dom'

function App() {
  const { user, setUser } = useUserContext()

  if (!user) return <LogIn setUser={setUser}/>

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </>
  );
}

export default App;
