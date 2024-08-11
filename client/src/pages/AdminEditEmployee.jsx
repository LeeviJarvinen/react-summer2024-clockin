import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditUserMutation, useGetUserQuery } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import DeleteEmployee from '../components/DeleteEmployee';

const AdminEditEmployee = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetUserQuery(id);
    const [update] = useEditUserMutation()
    const navigate = useNavigate()

    const [popup, setPopup] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [phonenumber, setPhonenumber] = useState('')

    useEffect(() => {
        if(data) {
            setUsername(data.username)
            setEmail(data.email)
            setPassword(data.password)
            setFirstname(data.personal_info.firstname)
            setLastname(data.personal_info.lastname)
            setAddress(data.personal_info.address)
            setPhonenumber(data.personal_info.phonenumber)
        }
    }, [data])

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await update({ id, username, email, password, firstname, lastname, address, phonenumber}).unwrap()
            toast.success(`User: ${username} edited`)
            navigate('/admin/list-employee')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    if (isLoading) return <div>Loading...</div>;

    return (
<div className="admin-dash-container">
        <header className='admin-dash-header'>
            <h1>Admin edit user</h1>
        </header>
        <div className="admin-dash-content">
        <DeleteEmployee id={id} username={username} trigger={popup} setTrigger={setPopup}/>
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
            </ul>
            <div className="admin-dash-buttons">
                <button className='default-button-style' type='submit'>Submit</button>
                <button type='button' className='default-button-style' onClick={() => navigate('/admin/list-employee')}>Cancel</button>
                <button type='button' className='default-button-style' onClick={() => setPopup(true)}>Delete</button>
            </div>
            </form>
            </div>
        </div>
    </div>
    );
};

export default AdminEditEmployee;
