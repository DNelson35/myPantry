import React from 'react'
import { useState } from 'react'
import useUserContext from '../hooks/useUserContext'
import AuthForm from '../components/AuthForm'

function LogIn() {
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  })

  const {setUser} = useUserContext()
  
  const onChange = (e) => {
    setFormInput({...formInput,[e.target.name]: e.target.value})
  }

  const onSignUpSubmit = (e) => {
    e.preventDefault()
    fetch("/signup", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formInput)
    })
    .then(resp =>{ 
      if (resp.ok){
        resp.json()
        .then(user => setUser(user))
      } else {
        resp.json().then(err => console.log(err.errors))
      }
    })
  }

  const onLogInSubmit = (e) => {
    e.preventDefault()
    fetch("/login", {
      method: 'POST',
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formInput)
    })
    .then(resp => {
      if(resp.ok){
        resp.json().then(user => setUser(user))
      } else{
        resp.json().then(err => console.log(err.errors))
      }
    })
  }


  return (
    <AuthForm
      onChange={onChange}
      onLogIn={onLogInSubmit}
      onSignUp={onSignUpSubmit}
      formInput={formInput}  
    />
  )
}

export default LogIn