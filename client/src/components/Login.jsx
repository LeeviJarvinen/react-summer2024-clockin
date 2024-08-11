// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLoginMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const { userInfo } = useSelector((state) => state.auth)

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({...res}))
            navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }


  return (
    <form className='none' onSubmit={handleSubmit}>
        <div className="login-container">
            { isLoading ? <p>loading...</p> : null}
            <div className="login-title">
                <h2>Login</h2>
            </div>
            <div className="login-message">
                <p></p>
            </div>
            <div className="login-input">
                <input 
                className='login-user' 
                type="email" 
                placeholder='Example@gmail.com' 
                autoComplete='off'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>

                <input 
                className='login-pass' 
                type="password" 
                placeholder='Password' 
                autoComplete='off'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div >
            <div className="login-button">
                <button type="submit">Login</button>
            </div>
            <div className="login-register">
                <Link to='/register'>Create account</Link>
            </div>
        </div>
    </form>
  )
}

export default Login