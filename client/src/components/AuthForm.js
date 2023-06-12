import React, { useState } from 'react'
import FormInput from './FormInput'

function AuthForm({onLogIn, onSignUp, onChange, formInput}) {
    const [showLogin, setShowLogin] = useState(true)
    const login = ["username", "password"]
    const signup = ["username", "password", "password_confirmation"]

    const formContent = showLogin? login.map(label => <FormInput key={label} title={label} input={formInput[label]} onChange={onChange}/>): signup.map(label => <FormInput key={label} title={label} input={formInput[label]} onChange={onChange}/>)

  return (
    <div className='flex justify-center items-center bg-slate-800 h-screen w-screen'>
        <div className="w-full max-w-lg">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={showLogin? onLogIn: onSignUp}>
              {formContent}
              {showLogin? 
               <>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                  Log In
                  </button>
                  <p className='pt-2'>
                    No account? 
                    <button className="text-blue-500 hover:text-blue-700 pl-3" type='button' onClick={() => setShowLogin(false)}>Sign up</button>
                  </p>
               </>
              : 
                <>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign up
                  </button>
                  <p className='pt-2'>
                    Have an account? 
                    <button className="text-blue-500 hover:text-blue-700 pl-3" type='button' onClick={() => setShowLogin(true)}>Log In</button>
                  </p>
                </>
              }
            </form>
        </div>
    </div>
  )
}

export default AuthForm