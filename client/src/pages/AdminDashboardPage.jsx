import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboardPage = () => {

  return (
              
        <div className="admin-dash-container">
        <header className='admin-dash-header'>
            <h1>admin dashboard</h1>
        </header>
        <div className="admin-dash-content">
            <ul>
                <li>
                    <Link to={'/admin/list-employee'}>
                        <button className='default-button-style'>List Employees</button>
                    </Link>
                </li>
                <li>
                    <Link to={'/admin/add-employee'}>
                        <button className='default-button-style'>Add Employee</button>
                    </Link>
                </li>
                <li>
                    <Link to={'/'}>
                        <button className='default-button-style'>Go back</button>
                    </Link>
                </li>
            </ul>
            </div>
        </div> 
  )
}

export default AdminDashboardPage