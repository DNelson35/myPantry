import React from 'react'

function FormInput({ title, input , onChange }) {
    const capTitle = title.charAt(0).toUpperCase() + title.slice(1)
  return (
    <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {capTitle}
        </label>
        {title.includes('password')? 
          <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" name={title} value={input} onChange={onChange} required/>
         :
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" name={title} placeholder={capTitle} value={input} onChange={onChange} required />
        }
    </div>
  )
}


export default FormInput