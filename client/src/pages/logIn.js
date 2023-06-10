import React from 'react'
import FormWrap from '../components/formWrap'

function LogIn() {
  return (
    <FormWrap>
        <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Log In
            </button>
        </div>
    </FormWrap>
  )
}

export default LogIn