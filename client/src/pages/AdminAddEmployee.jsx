import React, { useState } from 'react'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AdminAddEmployee = () => {
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [employee, setEmployee] = useState('')
    const [editor, setEditor] = useState('')
    const [admin, setAdmin] = useState('')
    const [roles, setRoles] = useState('')

    const [register, { isLoading }] = useRegisterMutation()
    const navigate = useNavigate()

    const handleEmployeeChange = (e) => {
        setEmployee(e.target.checked);
    };

    const handleEditorChange = (e) => {
        setEditor(e.target.checked);
    };

    const handleAdminChange = (e) => {
        setAdmin(e.target.checked);
    };

    const submitForm = async (e) => {
        e.preventDefault()
        const combinedRoles = `${employee ? 'Employee' : ''},${editor ? 'Editor' : ''},${admin ? 'Admin' : ''}`;
        setRoles(combinedRoles);
        try {
            const res = await register({ username, email, password, firstname, lastname, address, phonenumber, roles: combinedRoles}).unwrap()
            toast.success(`User: ${username} created`)
            navigate('/admin/dashboard')
            navigate(0)
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }
  return (
    <div className="admin-dash-container">
        <header className='admin-dash-header'>
            <h1>Admin add user</h1>
        </header>
        <div className="admin-dash-content">
            <div className="add-employee">
            <form onSubmit={submitForm}>
            <ul>
                <li>
                    <p>EmployeeID</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Enter name' 
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                </li>
                <li>
                    <p>Email</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Enter email' 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </li>
                <li>
                    <p>Password</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Enter password' 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </li>
                <li>
                    <p>Firstname</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Enter firstname'
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}/>
                </li>
                <li>
                    <p>Lastname</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Enter lastname'
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}/>
                </li>
                <li>
                    <p>Address</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Enter address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}/>
                </li>
                <li>
                    <p>Phonenumber</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Enter phone'
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}/>
                </li>
                <li>
                    <p>Employee</p>
                    <input
                    type='checkbox'
                    value={'Employee'}
                    onClick={handleEmployeeChange}/>
                    <p>Editor</p>
                    <input
                    type='checkbox'
                    value={'Editor'}
                    onClick={handleEditorChange}/>
                    <p>Admin</p>
                    <input
                    type='checkbox'
                    value={'Admin'}
                    onClick={handleAdminChange}/>
                </li>
            </ul>
            <div className='admin-dash-buttons edit'>
                <button className='default-button-style' type='submit'>Submit</button>
                <button className='default-button-style' onClick={() => navigate('/admin/dashboard')}>Cancel</button>
            </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default AdminAddEmployee