import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await register({ username, email, password }).unwrap()
            navigate('/login')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }


  return (
    <form onSubmit={handleSubmit}>
        <div className="register-container">
            { isLoading ? <p>loading...</p> : null}
            <div className="register-title">
                <h2>Register</h2>
            </div>
            <div className="register-message">
                <p></p>
            </div>
            <div className="register-input">
                <input 
                className='register-user' 
                type="text" 
                placeholder='Enter name' 
                autoComplete='off'
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}/>

                
                <input 
                className='register-email' 
                type="email" 
                placeholder='Enter Email' 
                autoComplete='off'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <input 
                className='register-pass' 
                type="password" 
                placeholder='Enter Password' 
                autoComplete='off'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="register-button">
                <button type="submit">Register</button>
            </div>
            <div className="register-login">
                <Link to='/login'>Already have an account</Link>
            </div>
        </div>
    </form>
  )
}

export default Register