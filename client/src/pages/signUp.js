import React from 'react'
import FormWrap from '../components/formWrap'

function SignUp() {
  return (
    <FormWrap>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************"/>
        </div>
        <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            Sign up
            </button>
        </div>
    </FormWrap>
  )
}

export default SignUp