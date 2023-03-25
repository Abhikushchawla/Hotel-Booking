import React, { useState, useContext } from 'react'
import './LoginPage.css'
import axios from 'axios'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  const { setUser } = useContext(UserContext)

  async function loginUser(e) {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:7000/login', {
        email,
        password,
      })
      // console.log(res)
      setUser(res.data)
      // alert('login Successful');
      setRedirect(true)
    } catch (e) {
      alert('login failed')
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div class="login-page">
      <div class="form">
        <div class="login">
          <div class="login-header">
            <h3>LOGIN</h3>
            <p>Please enter your credentials to login.</p>
          </div>
        </div>
        <form class="login-form" onSubmit={loginUser}>
          <input
            type="email"
            placeholder="abc@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>login</button>

          <div>
            Don't have an account
            <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
