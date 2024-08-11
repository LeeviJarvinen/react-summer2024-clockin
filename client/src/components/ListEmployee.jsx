import React, { useState } from 'react'
import { useGetAllQuery } from '../slices/usersApiSlice';
import { Link, useNavigate, } from 'react-router-dom';

const ListEmployee = () => {

    const navigate = useNavigate()

    const { data, isLoading } = useGetAllQuery();
    if (isLoading) return <div>Loading...</div>;

    const entries = Array.isArray(data) ? data : [];

  return (
    <div className="history-container">
    <div className="history-title">
        <h1>History</h1>
        <button className='default-button-style' onClick={() => navigate('/admin/dashboard')}>Go back</button>
    </div>
    <ul className="history-list">
        {entries.map((item, index) => (
            <li key={index} className="history-item">
                <div className="history-row">
                    <div className="history-column">
                        <div className="history-title">Employee ID:</div>
                        <div className="history-value">{item.username}</div>
                    </div>
                    <div className="history-column">
                        <div className="history-title">Fullname:</div>
                        <div className="history-value">{item.personal_info.firstname} {item.personal_info.lastname}</div>
                    </div>
                    <div className="history-column">
                        <div className="history-title">Address:</div>
                        <div className="history-value">{item.personal_info.address}</div>
                    </div>
                    <div className="history-column">
                        <div className="history-title">Email:</div>
                        <div className="history-value">{item.email}</div>
                    </div>
                    <div className="history-column">
                        <div className="history-title">Phone:</div>
                        <div className="history-value">{item.personal_info.phonenumber}</div>
                    </div>
                    <div className="history-column">
                        <div className="history-title">Roles:</div>
                        <div className="history-value">
                            {Object.entries(item.roles).map(([role, hasRole]) => hasRole && <div key={role}>{role}</div>)}
                        </div>
                    </div>
                    <div className='history-buttons'>
                        <Link to={`edit/${item._id}`}>
                            <button className='default-button-style'>Edit</button>
                        </Link>
                    </div>
                </div>
            </li>
        ))}
    </ul>
</div>
  )
}

export default ListEmployee