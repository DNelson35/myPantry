import SignUp from "./pages/signUp";
import LogIn from "./pages/logIn";
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <Routes>
      <Route path='/' element={<SignUp/>}/>
      <Route path='/login' element={<LogIn/>}/>
    </Routes>
  );
}

export default App;
