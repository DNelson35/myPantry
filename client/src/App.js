import {useState, useEffect} from 'react'

function App() {
  const [count , setCount] = useState(0)

  useEffect(() =>{
    fetch('/hello')
    .then(r => r.json())
    .then(data => setCount(data.count))
  },[])
  return (
    <div className="bg-black w-screen h-screen">
      <h1 className='text-white'>Page Count: {count}</h1>
    </div>
  );
}

export default App;
