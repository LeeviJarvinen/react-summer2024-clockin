import React, { useState } from 'react'
import { useManualMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
const Manual = (props) => {
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [date, setDate] = useState('')

    const [manual] = useManualMutation()

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const res = await manual({from, to, date}).unwrap()
            toast.success('Clocked in manually')
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
        props.setTrigger(false)
    }

  return (props.trigger) ? (
    <div className='manual-container'>
        <form onSubmit={submitForm}>
        <div className="manual-content">
            <h2>Manual</h2>
            <ul>
                <li>
                    <p>Date:</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Ex YYYY-MM-DD'
                    value={date}
                    onChange={(e) => (setDate(e.target.value))}/>
                </li>
                <li>
                    <p>From:</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Ex HH:MM:SS'
                    value={from}
                    onChange={(e) => (setFrom(e.target.value))}/>
                </li>
                <li>
                    <p>To:</p>
                    <input 
                    className='default-input-style' 
                    type="text" 
                    placeholder='Ex (HH:MM:SS)'
                    value={to}
                    onChange={(e) => (setTo(e.target.value))}/>
                </li>
            </ul>
            <button type='submit' className='default-button-style'>Add</button>
            <button className='default-button-style' onClick={() => props.setTrigger(false)}>Cancel</button>
        </div>
        </form>
    </div>
  ) : '';
}

export default Manual