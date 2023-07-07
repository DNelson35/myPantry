import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

function LogIn({ setUser }) {
  const [formInput, setFormInput] = useState({
    username: '',
    password: '',
    password_confirmation: '',
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate()

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
        .then(user => {
          setUser(user)
          navigate('/')
          console.clear()
        })
      } else {
        resp.json().then(err =>{
          setError(err.errors)
          setFormInput({
            username: '',
            password: '',
            password_confirmation: '',
          })
        })
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
        resp.json().then(user =>  {
          setUser(user)
          navigate('/')
          console.clear()
        })
      } else{
        resp.json().then(err => {
          setError(err.errors)
          setFormInput({
            username: '',
            password: '',
            password_confirmation: '',
          })
        })
      }
    })
  }


  return (
    <AuthForm
      onChange={onChange}
      onLogIn={onLogInSubmit}
      onSignUp={onSignUpSubmit}
      formInput={formInput}  
      error={error}
      setError={setError}
    />
  )
}

export default LogIn