import React from 'react'
import { toast } from 'react-toastify'
import { useDeleteUserMutation, useGetUserQuery } from '../slices/usersApiSlice'
import { useNavigate } from 'react-router-dom'

const DeleteEmployee = (props) => {
    const id = props.id
    const [deleteUser] = useDeleteUserMutation();

    const navigate = useNavigate()

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await deleteUser(id)
            toast.success('Deleted user succesfully')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
        props.setTrigger(false)
        navigate('/admin/list-employee')
        navigate(0)
    }

  return (props.trigger) ? (
    <div className='manual-container'>
        <form onSubmit={submitForm}>
        <div className="manual-content">
            <h2>Confirm</h2>
            <p>{`Are you sure you want to delete ${props.username}`}</p>
            <button type='submit' className='default-button-style'>Confirm</button>
            <button className='default-button-style' onClick={() => props.setTrigger(false)}>Cancel</button>
        </div>
        </form>
    </div>
  ) : '';
}

export default DeleteEmployee