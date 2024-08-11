import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useClockinMutation, useClockoutMutation, useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { toast } from 'react-toastify'
import History from '../components/History'
import Manual from '../components/Manual'
import { useState } from 'react'
import ListEntries from '../components/ListEntries'


const HomePage = () => {

  const [popup, setPopup] = useState(false)

  const navigate = useNavigate() 
  const dispatch = useDispatch()

  const [logoutMutation] = useLogoutMutation()
  const [clockIn] = useClockinMutation()
  const [clockOut] = useClockoutMutation()

  const { userInfo } = useSelector((state) => state.auth)

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      const res = await logoutMutation()
      dispatch(logout())
      navigate(0, '/login')
  } catch (err) {
    toast.error(err?.data?.message || err.error)
    }
  }

  const handleClockin = async (e) => {
    e.preventDefault()
    try {
      const res = await clockIn()
      toast.success(`Clocked in at: ${res.data.clockEntry.from}`)
  } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  const handleClockOut = async (e) => {
    e.preventDefault()
    try {
      const res = await clockOut()
      toast.success(`Clocked out at: ${res.data.clockEntry.to}`)
  } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className="home-container">
      <header className="home-header">
         <h1>Clocker</h1>
      </header>
      <div className="home-content">
        <div className="home-sidebar left">
          <h2 className='dark'>Actions</h2>
          <div className="home-sidebar left-button-container">
              <ul>
                <li>
                  <button className='default-button-style' onClick={handleClockin}>Clock in</button>
                </li>
                <li>
                  <button className='default-button-style' onClick={handleClockOut}>Clock out</button>
                </li>
                <li>
                  <button className='default-button-style' onClick={() => setPopup(true)}>Manual</button>
                </li>
                <li>
                  <button className='default-button-style' onClick={handleLogout}>logout</button>
                </li>
                <li>
                  {userInfo.roles.Admin ?
                    <Link to='/admin/dashboard'>
                      <button className='default-button-style'>Admin controls</button>
                    </Link>
                    :
                    null}
                </li>
              </ul>
            </div>
        </div>
        <Manual trigger={popup} setTrigger={setPopup}/>
        <div className="home-main">
          <ListEntries/>
        </div>
        <div className="home-sidebar right">
          <h2 className='dark'>Userdata</h2>
          <div className="home-sidebar right-userdata">
            <ul>
              <li>
                <p>EmployeeID: {userInfo.username}</p>
              </li>
              <li>
                <p>Employee: {userInfo.personal_info.firstname+' '+userInfo.personal_info.lastname}</p>
              </li>
              <li>
                <p>Email: {userInfo.email}</p>
              </li>
              <li>
                <p>Address: {userInfo.personal_info.address}</p>
              </li>
              <li>
                <p>Phonenumber: {userInfo.personal_info.phonenumber}</p>
              </li>
            </ul>
          </div>
          <h2 className='dark'>Last 10 entries</h2>
          <div className="home-sidebar right-user-history">
            <History/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage