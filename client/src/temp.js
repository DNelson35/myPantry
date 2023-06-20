



//  TODO: this is for a form to create items the quantity and experation date will be moved to a diffrent form : description follow

/* <h1> total items stored = {user.total_items}</h1>
      <form className='flex  justify-between h-20 w-full bg-slate-500 items-center mt-10 p-3' onSubmit={onItemFormSubmit}>
        <div>
          <label>name</label>
          <input name='name' value={name} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>sku</label>
          <input name='sku' value={sku} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>description</label>
          <input name='description' value={description} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>expiration Date</label>
          <input name='experation_date' value={experiment_date} onChange={updateItemInput}></input>
        </div>
        <div>
          <label>quantity</label>
          <input name='quantity' value={quantity} onChange={updateItemInput}></input>
        </div>
        <button type="submit">Save</button>
      </form>
      <br/>
      <br/>
      <br/>
      {userItemsList} */

    // TODO: this is for tracking input when creating an item
    //   const [itemInput, setItemInput] = useState({
    //     name: '',
    //     sku: '',
    //     description: '',
    //     experation_date: '',
    //     quantity: 0
    //   })


    
    //   const {name, sku, description, experiment_date, quantity} = itemInput
    
    //   const updateItemInput = (e) => {
    //     if (e.target.name !== quantity) {
    //       setItemInput({...itemInput, [e.target.name]: e.target.value})
    //     } else
    //       setItemInput({...itemInput, [e.target.name]: parseInt(e.target.value)})
    //   }
    
     
    
    //   const onItemFormSubmit = (e) => {
    //     e.preventDefault()
    //     fetch('/items', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(itemInput)
    //     })
    //     .then(resp => {
    //       if(resp.ok){
    //         resp.json().then(item => setItem(item))
    //       }
    //     })
    //   }


    // TODO : implement the following code on retriving item data 

   
  
  
    // const itemsList = items?.map(item => (
    //   <div key={item.id}>
    //     <h1>{item.name}</h1>
    //     <img src={item.image_url} alt={item.name}/>
    //     <ol>
    //       <li><span>sku: </span>{item.sku}</li>
    //       <li><span>description: </span>{item.description}</li>
    //       <li><span>category: </span>{item.category}</li>
    //     </ol>
    //   </div>
    // ))
    
    // return (
    //   <div>
    //    {itemsList}
    //   </div>
    // )